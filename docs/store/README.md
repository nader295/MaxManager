# Store graphics — drawn from the app, never generated

[[العربية](#صور-المتجر--تُرسم-من-التطبيق-ولا-تُولَّد) ↓]

This folder holds the images a store listing uses, the text that goes with them, and the contract that
builds both. **Nothing here comes out of an image generator, and nothing here is edited by hand**:
every file is *built* from sources that already live in this repository, and then measured.

## The rule

The evaluation note was blunt: *"excessive AI feel … and for the thumbnails, use a design of your own
instead of image generators."* The answer is written down as `ADR-73`, and it has one sentence:

> **No file produced by an image generator enters this repository.**

So every pixel here is one of four things the project already owns:

| Source | Where it lives | What it contributes |
| --- | --- | --- |
| A **real screenshot** | `docs/screenshots/` | the phone — its own device frame, captured from the app |
| The app's **palette** | `DARK` in `tools/gen_readme_assets.py`, which is measured against `MaxTokens.kt` | background, panels, edges, ink, the mint accent |
| The **maker's mark** | the one geometry in `tools/makers_mark.py` | the wordmark's mark, drawn with the same numbers the app draws |
| The app's **typefaces** | Space Grotesk · Manrope · JetBrains Mono (`Fonts.kt`) | every word on the card |

Arabic is drawn with Noto (Kufi for headlines, Sans Arabic for body) — the same family Android falls
back to, because the two Latin faces have no Arabic glyphs. That is not a substitution dressed up as a
choice; it is what an Arabic user actually sees in the app.

## What is here

| File | Kind | Built from |
| --- | --- | --- |
| `card-01-now-{en,ar}.png` | 1080×1920 phone card | `docs/screenshots/02-now-home.png` |
| `card-02-max-ai-{en,ar}.png` | 1080×1920 phone card | `docs/screenshots/03-max-ai.png` |
| `card-03-control-{en,ar}.png` | 1080×1920 phone card | `docs/screenshots/07-control-hub.png` |
| `feature-{en,ar}.png` | 1024×500 feature graphic | `docs/screenshots/02-now-home.png` |
| `spec.json` | the contract — captions, claims, palette, fonts, measured numbers | hand-authored, machine-read |
| `manifest.json` | byte hashes, sizes, sources, font hashes, mark fingerprint | generated |
| `listing.md` | the store text, both languages | generated from `spec.json` |

`spec.json` is the only file a human writes. Everything else is derived, and `--assert` fails when a
derived file drifts from it.

## Regenerating

```sh
python3 tools/store_thumbnails.py --generate     # rebuild every image + manifest + listing
python3 tools/store_thumbnails.py --reproduce    # same inputs ⇒ same bytes, measured
python3 tools/store_thumbnails.py --assert       # verify the committed files (stdlib only — runs in CI)
python3 tools/store_thumbnails.py --self-test    # break the inputs on purpose; the checker must catch it
```

`--generate` needs Pillow **and the three typefaces**, which are *not* bundled in this repository (the
app downloads them on-device; the repo ships no font binaries). They are installed outside the tree,
the same way the OCR models are:

```sh
mkdir -p ~/.local/share/fonts/maxmanager-store
cd ~/.local/share/fonts/maxmanager-store
curl -fLO https://raw.githubusercontent.com/google/fonts/main/ofl/spacegrotesk/SpaceGrotesk%5Bwght%5D.ttf
curl -fLO https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf
curl -fLO https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf
```

Missing fonts are a hard stop with the list of what was looked for — they are never silently swapped.
`--font-display` / `--font-body` / `--font-mono` / `--font-ar` / `--font-arBody` override any of them.

Two more refusals, both born from a defect that actually shipped into a draft image:

- **A glyph with no shape stops the build.** The first Arabic pass rendered the claim chips as empty
  boxes (the mono face has no Arabic) and a full stop as a box (Kufi has no `.`). The generator now
  renders every character against a known-absent one and refuses to save a card containing tofu.
- **A claim that is not published stops the build.** Each chip's substance must appear in
  `README.md` / `README.ar.md`; the store may only repeat what the project already claims in public.

## What is measured — and what is not

Measured on every `--assert`, with no Pillow and no fonts, so CI can run it:

- every source screenshot exists and matches the declared dimensions;
- every generated file matches its recorded byte hash, size and dimensions — and no orphan PNG exists;
- the palette equals `DARK` in `tools/gen_readme_assets.py`, and the mark's two colours equal
  `PositiveOnDark` / `PositiveOnLight` in `MaxTokens.kt`;
- the mark's geometry fingerprint equals the current one in `tools/makers_mark.py`;
- every claim anchor is present in the two READMEs;
- the declared numbers (`screens`, `locales`) equal what the tree actually contains;
- `listing.md` is character-for-character what `spec.json` produces;
- `spec.json`'s hash matches the manifest, so an edited contract cannot pass with stale images.

`--reproduce` adds determinism: two runs from the same inputs give the same bytes, so a reviewer can
check an image by hash instead of by eye.

**Not measured: whether the result looks good.** No gate in this repository can judge that, and this
page will not pretend otherwise. The composition is meant to be looked at — open a card.

## One limitation, declared

The Arabic cards carry **English-UI screenshots**, because Arabic RTL screenshots do not exist yet in
`docs/screenshots/` — the naming contract says so itself ("ولا واحدة منها موجودة بعد"). The captions,
the chips and the layout are Arabic and right-to-left; only the captured screen is not. When those
frames are captured, point `spec.json` at the `-ar` files and regenerate — nothing else changes.

---

## صور المتجر — تُرسم من التطبيق ولا تُولَّد

[[English](#store-graphics--drawn-from-the-app-never-generated) ↑]

هذا المجلّد يحمل صور إعلان المتجر ونصّه، والعقد الذي يبني كليهما. **لا شيء فيه من مولّد صور، ولا
شيء فيه يُحرَّر بيد**: كل ملفّ **يُبنى** من مصادر موجودة في المستودع أصلًا، ثم يُقاس.

### القاعدة

ملاحظة التقييم كانت صريحة: «استخدام الذكاء الاصطناعي مفرط … وبالنسبة للصور المصغّرة اعتمد تصميمًا
خاصًّا بالتطبيقات بدلًا من أدوات توليد الصور». والجواب مكتوب في `ADR-73` بجملة واحدة:

> **لا يدخل هذا المستودع ملفّ من مولّد صور.**

فكل بكسل هنا أحد أربعة أشياء يملكها المشروع بالفعل: **لقطة شاشة حقيقية** من `docs/screenshots/`
(بإطار جهازها)، و**لوحة ألوان التطبيق** (`DARK` في `tools/gen_readme_assets.py` — وهي مقيسة على
`MaxTokens.kt`)، و**وسم الصانع** (هندسة `tools/makers_mark.py` الواحدة، بالأرقام التي يرسمها التطبيق)،
و**خطوط التطبيق نفسها** (`Space Grotesk` · `Manrope` · `JetBrains Mono` — `Fonts.kt`).

والعربية تُرسم بـ`Noto` (Kufi للعنوان، وSans Arabic للمتن) — وهو ما يسقط إليه النصّ العربي في أندرويد،
لأن الخطّين اللاتينيّين بلا محارف عربية. ليس ذلك حيلة تسمية، بل ما يراه المستخدم العربي فعلًا.

### ما هنا

`spec.json` هو **الملفّ الوحيد الذي يكتبه إنسان**: العناوين والادّعاءات واللوحة والخطوط والأرقام
المقيسة. وكل ما سواه مشتقّ منه: ثماني صور (`card-01-now` · `card-02-max-ai` · `card-03-control`
بالعربية والإنجليزية · `feature-{en,ar}`)، و`manifest.json` (بصمات البايتات والمصادر وبصمة هندسة
الوسم)، و`listing.md` (نصّ المتجر بلغتيه). و`--assert` يسقط حين ينزاح المشتقّ عن أصله.

### إعادة التوليد

```sh
python3 tools/store_thumbnails.py --generate     # الصور + البيان + نصّ المتجر
python3 tools/store_thumbnails.py --reproduce    # نفس المدخلات ⇒ نفس البايتات (مقيس)
python3 tools/store_thumbnails.py --assert       # يقيس الملفّات الملتزمة (بلا Pillow — يعمل في CI)
python3 tools/store_thumbnails.py --self-test    # يكسر المدخلات عمدًا: الفحص يجب أن يكشفها
```

والخطوط **ليست** في المستودع (التطبيق ينزّلها على الجهاز، ولا يُشحن خطّ في المستودع)، فتُثبَّت خارجه
كما تُثبَّت نماذج `tesseract`/`EasyOCR` — والتفصيل الإنجليزيّ أعلاه بالأمر الجاهز. وخطّ ناقص **يوقف
التوليد بقائمة ما جُرِّب**، ولا يُستبدَل بصمت.

ورفضان آخران، كلاهما وُلد من عيب وقع فعلًا في نسخة تجريبية:

- **محرف بلا شكل يوقف البناء**: أول تمرير عربي رسم شرائح الادّعاء مربّعات فارغة (الخطّ الأحاديّ بلا
  محارف عربية) والنقطة النهائية مربّعًا (Kufi بلا `.`). فصار المولّد يقيس كل محرف مقابل محرف غائب
  حتمًا، ويرفض حفظ بطاقة فيها مربّع.
- **ادّعاء غير منشور يوقف البناء**: مضمون كل شريحة يجب أن يكون منشورًا في `README.md` /
  `README.ar.md` — فالمتجر لا يقول إلا ما يقوله المشروع في العلن.

### ما يُقاس — وما لا يُقاس

يُقاس في كل `--assert` (بلا Pillow وبلا خطوط، فيعمل في CI): وجود اللقطات المصدر بأبعادها المعلَنة ·
مطابقة كل صورة مولّدة لبصمتها وحجمها · عدم وجود صورة يتيمة · مطابقة اللوحة للوحة المستودع ولونَي
الوسم لثوابت `MaxTokens.kt` · بصمة هندسة الوسم · **نشر** كل ادّعاء في الصفحتين · مطابقة الأرقام
المعلَنة (٦٢ شاشة · ٨٤ لغة) لما في الشجرة · أن `listing.md` حرفيًّا ما يولّده العقد · وبصمة `spec.json`
مقابل البيان (فتعديل العقد لا يمرّ بصور متقادمة). و`--reproduce` يقيس الحتمية: تشغيلان من مدخلات
واحدة يعطيان البايتات نفسها — فيُراجع المراجع الصورة ببصمتها لا بعينه.

**وما لا يُقاس: هل الناتج جميل.** لا بوّابة في هذا المستودع تحكم على ذلك، وهذه الصفحة لا تدّعي خلافه.
التركيب مقصود ليُنظر إليه — افتح بطاقة.

### حدّ واحد، مُعلَن

البطاقات العربية تحمل **لقطات بواجهة إنجليزية**، لأن لقطات RTL العربية غير موجودة بعد في
`docs/screenshots/` — وعقد الأسماء يقولها بنفسه («ولا واحدة منها موجودة بعد»). فالعناوين والشرائح
والتخطيط عربية ومن اليمين إلى اليسار، واللقطة وحدها ليست كذلك. وحين تُلتقط تلك الإطارات يكفي أن
يُشار في `spec.json` إلى ملفّات `-ar` ويُعاد التوليد — ولا يتغيّر شيء آخر.

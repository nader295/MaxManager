# Third-Party Notices — MaxManager

هذا الملفّ قائمة **ما ليس مملوكًا لنا ويدخل التوزيع** — بإشعاره ورخصته. وما عدا ذلك يحكمه `LICENSE`
وحده.

**ووظيفته واحدة: أن يقول ما أضفناه.** فلا يُثقل بذكر **منهجٍ** أُلهمنا منه ولا مشروعٍ **لم يُنقل منه
كود**، ولا بسرد تاريخ التنقية وأدلّة الأدوات — فسجلّ الإزالة وإعادة التأليف والدلائل المقيسة في
`docs/PROVENANCE.md` وفي `docs/ai/HANDOFF.md`، وهما موضع الإثبات.

والقائمة **مقيسة لا مكتوبة من الذاكرة**: مصدرها `python3 tools/license_audit.py --json` الذي يقرأ
ترويسة كلّ ملفّ متعقَّب، وترويسة ELF لكلّ ثنائية، وتتبّعات Gradle (٤٢) وصناديق Cargo (١٠٨). ومن قرأ
رقمًا هنا يستطيع إعادة اشتقاقه بالأمر نفسه.

**وعلاقة هذا الملفّ بقسم `Credits` في `README.md`:** يُذكر هناك اسم العمل وحقّ النشر والرخصة
**إعلانًا للفضل**، ولا يُنقل إليه نصّ الإشعار. وهذا الملفّ يبقى **وحده** المرجع الملزم، ووحده موضع
النصّ الكامل للرخصة. ولا تُعاد كتابة ملكية مؤلّف خارجي ولا تُنسب ملفاته إلى المشروع.

## 1. مكوّنات مشمولة في الشجرة

| المكوّن | ما استُعمل منه | الترخيص | حقوق النشر |
| --- | --- | --- | --- |
| **AZenith** `github.com/Liliya2727/AZenith` | صاحب ترويسة `Copyright (C) 2026-2027 Zexshia` التي تحملها **٢٤٧ ملفًا** في `manager/` و`archdaemon/` (ومجموعة `archdaemon/` يصنّفها التدقيق بـ«Encore Daemon (via AZenith)») | Apache-2.0 | Copyright (C) 2025-2026 Zexshia |
| **Encore Tweaks** `github.com/Rem01Gaming/encore` | أساس خدمة `archdaemon/` (٤٠ ملفًا في الوحدة؛ منها ١٤ ملفّ C ومعه `mainfiles/verify.sh` و`AppMonitor.kt` **تحمل ترويسته صراحةً**) | Apache-2.0 | Copyright (C) 2024-2025 Rem01Gaming |
| **Rianixia-ThermalCore** `github.com/ryanistr/Rianixia-ThermalCore` | محرّك الإدارة الحرارية `thermalcore/` (١٦ ملفّ Rust؛ منها ٣ تُسمّي أصله: `main.rs` · `monitor.rs` · `android_ffi.rs`) | Apache-2.0 | Copyright (C) 2025-2026 ryanistr |
| **Android Open Source Project** `source.android.com/license` | بنية مساحة المستخدم وسياسة SELinux؛ أدوات الإقلاع/الصور (`binutils/` · `android/aosp/`)؛ **رؤوس عقد مؤثّرات الصوت** مُجزَّأة حرفيًّا في `maxfx/include/maxfx_effect_abi.h` من `hardware/libhardware/include/hardware/audio_effect.h` و`system/media/audio/include/system/audio_effect{,-base}.h` (نقلٌ من ترخيص متسامح بنسبة الفضل — ADR-55) | Apache-2.0 | Copyright (C) The Android Open Source Project |
| **VMTouch** `github.com/hoytech/vmtouch` | **كود مُضمَّن ومُعدَّل**: `preloadbin/jni/main.c` هو vmtouch 1.4.1 (**٩٩٫٧٪ مطابقة — فارق ٣ أسطر**) يُبنى منه `sys.maxmanager-preloadbin` | BSD-3-Clause | Copyright (c) 2009-2023 Doug Hoyte and contributors |
| **Islandify** `github.com/bughunter11/Islandify` | المحرّك الكامل للجزيرة الديناميكية: مستمع الإشعارات/الوسائط/المكالمات/المؤقّتات، والمتحكّم المركزي، ونافذة التراكب **فوق شريط الحالة** (خدمة وصولية + سقوط إلى «الرسم فوق التطبيقات»)، والبطاقات والفقاعات والنوافذ، وواجهات الاستوديو الخمس (الرئيسية · الأنشطة · التخصيص · التطبيقات · حول) والتعريف — منقول ومُكيَّف في `manager/app/src/main/java/nd/max/island/` (**٢٠ ملفًّا**) مع نصوصه في `values/` و`values-ar/` | MIT | Copyright (c) 2026 bughunter11 |

فكرة تنظيم السجلّ — تدوير متعدّد الأجيال، وسجلّ التفصيل خلف `debugmode` — مأخوذة من AZenith (commit `95df79b`، Apache-2.0)، ولا شيفرة منقولة منه؛ التنفيذ في `SystemLogger.c` و`FileHandler.c` من تأليفنا.

## 2. الإشعارات المحفوظة في ملفّاتها — ولا تُنسخ هنا

- **Apache-2.0 محفوظ كما هو في ٢٨١ ملفًّا** داخل `manager/app` يحمل في ترويسته اسم مؤلّف خارجي
  (`Zexshia` ٢٤٧ · `MaxManager contributors` ٣٢ · `Rapli` ١ · `KowX` ١). وهي تبقى على رخصتها مع
  إشعارها **كما هي**: لا تُعاد كتابتها ولا تُنسب إلى ملكية المشروع — لأن إشعار Apache-2.0 شرط بقاء،
  ولا يُمحى بانتقال الملفّ إلى مجلّد آخر. والتفصيل في `docs/PROVENANCE.md` (حالة
  `APACHE_HEADER_RETAINED`)، وأسماء هؤلاء المؤلّفين في قسم `Credits` بـ`README.md`.
- **vmtouch يُحفظ إشعاره كاملًا في ترويسة ملفّه** (الشرط الأول من BSD-3-Clause: تبقى حقوق النشر
  وقائمة الشروط وإخلاء المسؤولية في المصدر)، فلا يُعاد نسخه هنا ليَشِيخ: الملفّ `preloadbin/jni/main.c`
  يحمل حقوق النشر والرخصة وتعديلات MaxManager، و`preloadbin/README.md` هو README vmtouch الأصلي
  بسطر حقوقه.

## 2.1 نصّ رخصة Islandify (MIT) — منقول كما هو

MIT License

Copyright (c) 2026 bughunter11

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 3. مكتبات تُبنى معها (لا نسخ مصدري في المستودع)

تُقرأ من ملفات البناء والكتالوج، وتُراجَع عند كل تحديث إصدار:

- **تبعيات Gradle (٤٢)** — التوزيع المقيس: `Apache-2.0` (٣٦) · `MIT` (٤، تُشحن) · واثنتان **لا
  تُشحنان** فهما `testImplementation` وحدهما: `junit:junit` (`EPL-1.0`) و`org.json:json`
  (`Public-Domain`). وترخيص `EPL-1.0` **مُعلَن لا مسكوت عنه**: ضعيف الترابط وبمستوى الملفّ،
  والاعتماد عليه في نطاق الاختبار فقط. القائمة بأسمائها في `build/license-report.json`.
- **صناديق Cargo (١٠٨)** — التوزيع المقيس: `MIT OR Apache-2.0` (١٠٣) · `Apache-2.0` (٤) · `Zlib` (١).

## External identity interfaces — no bundled upstream implementation

This section records integration provenance, **not a claim that external engine code is distributed**.

- **COPG** — Original project: https://github.com/AlirezaParsi/COPG · Author: AlirezaParsi · License of inspected public tree: Apache-2.0 (`301a0a3dc2b55c294d32e369729f24dc5255ebd1/LICENSE`, read in full). Used components: documented `COPG.json` external interface only. Modifications: none to upstream files; independent MaxManager validation/resolution/merge. Integration location: `manager/app/src/main/java/nd/max/core/spoof/SpoofCopgContract.kt`. No upstream native binary/source, WebUI or assets bundled; the unavailable native source and paid features are not inferred to share this permission.
- **COPG-VD** — Original project: https://github.com/VD171/COPG-VD · Authors: VD171 & AlirezaParsi (module.prop) · Public LICENSE: Apache-2.0 (`1978f40bb78b6cd604d18438b05a344140f056d2`, read in full). Used components: documented global JSON interface as research; no source or binary bundled. Integration design: `docs/ai/DEVICE_SPOOF_ARCHITECTURE.md`.
- Device Faker (GPL-3.0) and DeviceSpoofLab (MIT public parent trees) are **analysis-only references**. No source, binary, template, asset or direct code adaptation is included. Their inspected sources and limits are in `docs/ai/DEVICE_FAKER_ANALYSIS.md` and `DEVICESPOOFLAB_ANALYSIS.md`; submodule permissions are not assumed.

## 4. كيف يُتحقّق من هذه القائمة — بأمر، لا بوصف

```sh
python3 tools/license_audit.py --assert       # لا GPL في مسار الإصدار، ولا أصل مُخفى بترويسة ملكية
python3 tools/license_audit.py --self-test    # يقيس الأداة نفسها
```

وتُشغَّلان في CI ضمن خطوة «Contract gates» **قبل** البناء الثقيل، فتنكشف عودة أيّ مكوّن GPL في ثوانٍ.
ونتائج التدقيق الحيّة — بالأرقام والحالات — في `docs/PROVENANCE.md`،
و`docs/AUTHENTICITY.md` لقياس استقلال النصّ عن الأصل المرجعي.

- **COPG (مفردات الوسوم)** — `CopgTag.kt` يعيد صياغة **مفردات** وسوم الحزم الموصوفة في README المستودع (Apache-2.0)؛ **لا شيفرة منقولة**. الإسناد: AlirezaParsi/COPG (README الإصدار 6.8.0 وREADME أقدم منه، قُرئا 2026-10-04).

- **COPG (بيانات كتالوج الأجهزة)** — `app/src/main/assets/spoof/device_catalog.json` مستخرَج من `module/COPG.json` (كتل `PACKAGES_*_DEVICE` فقط) في AlirezaParsi/COPG، فرع `JSON` عند `e1d7da6c24cb571c5d123a6f7c85fafbb42b870b` (قُرئ 2026-10-04)، **Apache-2.0**. **عُدِّل**: أُعيد ترميز المفاتيح وحُذفت قوائم الحزم والوسوم. نصّ الترخيص مرفق: `assets/spoof/device_catalog.LICENSE.txt`. شُحنت البيانات كما هي (لا بصمة اختُلقت).

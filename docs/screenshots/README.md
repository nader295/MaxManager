# Screenshots — the naming contract

[[العربية](#لقطات-الشاشة--عقد-الأسماء) ↓]

This folder holds the 72 frames the gallery draws, and the two files that decide what actually appears:
`gallery.json` — the machine-readable contract (grid, captions, routes, dimensions, groups) — and
[`tools/screenshot_gallery.py`](../../tools/screenshot_gallery.py), the generator that reads it.

**How a frame reaches the page.** The generator looks for `<stem>.png` in this folder and writes the grid
between the `screenshots:start` and `screenshots:end` markers in the two front pages,
[`README.md`](../../README.md#screenshots) and [`README.ar.md`](../../README.ar.md#اللقطات):

```sh
python3 tools/screenshot_gallery.py --write    # redraw the grid from the frames that exist
python3 tools/screenshot_gallery.py --assert   # fail if the page drifted from this folder
python3 tools/screenshot_gallery.py --list     # what is captured, and what is still pending
```

**Where the block sits.** It is the **second section** of both front pages, directly under *In ten
seconds* and above *Why it is built this way*: a first-time reader decides whether to keep reading at
that point. The generator follows its markers wherever they are, so this is a change to the page and not
to this contract — but it is recorded here because the position is now part of how the section is meant to
be read: **the screens come before the engines.**

Two consequences, and both are the point: **a frame whose file is missing is simply not drawn** — never a
broken image — and **a file whose name this contract does not carry never appears at all**, so a typo is
caught by `--assert` in the same run instead of shipping quietly.

> **What is measured about the frame itself.** A real PNG (signature, IHDR, IDAT, IEND, per-chunk CRC),
> the phone ratio declared below, the size ceiling — and any PNG in this folder that the contract does not
> list is named. What is **not** measured: whether a capture actually shows what its caption promises.
> That is left to whoever opens the page, and is not claimed here.

| | |
| --- | --- |
| **Dimensions** | 1162×2480 for phone groups (the capturing device's canvas; one ratio per group). The **Game space** group is landscape at **1280×576** and declares its own ratio in `gallery.json` |
| **Format · size** | PNG · under 400 KiB per frame |
| **Consistency** | one status-bar choice across all frames; dark theme throughout |
| **Variants** | `-light` for the light theme · `-ar` for Arabic / RTL |
| **The route column** | the screen's real route, checkable against `ui/navigation/MaxDestinations.kt` |

`python3 tools/readme_assets.py --assert` counts what is declared and reports the rest as **pending**:
a missing screenshot never fails the run.

The detailed table below — and the capture steps — are in Arabic, because this is the contract the
maintainer works from.

---

## لقطات الشاشة — عقد الأسماء

هذا المجلّد هو **المرجع الوحيد** لأسماء اللقطات التي يُشير إليها `README.md` و`README.ar.md`، وفيه
ملفّان يحكمان ما يظهر فعلًا: `gallery.json` وهو العقد المقروء آليًّا (الأعمدة والتسميات والمسارات
والأبعاد والسقف والمجموعات)، و`tools/screenshot_gallery.py` وهو المولِّد الذي يقرأه.

> **الحالة الآن:** ٦٧ لقطة حقيقية من جهاز المالك من أصل ٧٢ خانة، مسقَطة بأسمائها، فيرسم المولِّد شبكة كاملة بين
> علامتَي `screenshots:start` و`screenshots:end` في [`README.md`](../../README.md#screenshots)
> و[`README.ar.md`](../../README.ar.md#اللقطات):
>
> ```sh
> python3 tools/screenshot_gallery.py --write    # يرسم الشبكة من الإطارات الموجودة
> python3 tools/screenshot_gallery.py --assert   # يسقط إن انزاحت الصفحة عن المجلّد
> python3 tools/screenshot_gallery.py --list     # الملتقط، والمعلَّق
> ```
>
> **والنتيجتان هما المقصود:** الإطار الذي لا ملفّ له **لا يُرسم أبدًا** — فلا صورة مكسورة؛ والملفّ الذي
> لا يذكره هذا العقد **لا يظهر أبدًا** — فيُمسك الخطأ المطبعي بـ`--assert` في التشغيل نفسه بدل أن يُدفع
> بصمت. و`python3 tools/readme_assets.py` يظلّ يعُدّ ما يُشار إليه ويُعلن الناقص **معلَّقًا** ولا يُفشل.
>
> **وما يُقاس من اللقطة نفسها:** ملفّ PNG حقيقيّ (توقيع · IHDR · IDAT · IEND · CRC لكل مقطع)، ونسبة
> الشاشة المعلنة أدناه، وسقف الحجم — ويُسمّى أيضًا كلّ PNG في المجلّد لا يذكره العقد. و**ما لا يُقاس**:
> أن تُظهر اللقطة فعلًا ما يعد به وصفها؛ فذاك يبقى لأوّل من يفتح الصفحة.

---

## كيف تُضاف لقطة (٣ خطوات)

1. صوّر الشاشة على الجهاز، والاسم **حرفيًّا** كما في الجدول أدناه (مثال: `01-start.png`).
2. أسقط الملفّ في هذا المجلّد (`docs/screenshots/`).
3. شغّل `python3 tools/screenshot_gallery.py --write` ثم ادفع. ولا تكتب شيئًا في الـREADME بيد: الكتلة
   بين العلامتين تُعاد كتابتها من محتوى المجلّد، ومن كتب فيها بيد سقطت عليه `--assert`.

## وموضع الشبكة في الصفحة

صارت الشبكة **القسم الثاني** في الصفحتين — تحت «في عشر ثوانٍ» مباشرةً وفوق «لماذا بُني هكذا». والسبب
مقيس: الزائر يقرّر عند هذا الموضع هل يبقى، وكان أوّل رسم للمنتج يُقابله بعد **ثلثي** الصفحة؛ فلم يكن
أمامه في اللحظة التي يقرّر فيها شيءٌ يراه إلا نصّ. والمولِّد يتبع علامتيه حيث كانتا — فالموضع تغييرٌ في
الصفحة لا في العقد، لكنّه مُدوَّن هنا لأنّه صار جزءًا من كيف يُقرأ القسم: **الشاشات قبل المحرّكات**.

## مواصفات اللقطة (حتى يبقى المعرض متّسقًا)

| | القيمة | ولماذا |
| --- | --- | --- |
| الأبعاد | **1162×2480** للهاتف · **1280×576** لمجموعة Game space | هذا مقاس الجهاز الذي التُقطت عليه، والصفوف تتراصف داخل كل مجموعة؛ والمجموعة الأفقية تُعلن نسبتها في العقد |
| الصيغة | **PNG** | النصّ الحادّ يتشوّه في JPEG عند هذا الحجم |
| الحجم | **أقلّ من ٤٠٠KiB** للّقطة | ٧٢ صورة × ٤٠٠KiB سقفًا أعلى = صفحة ثقيلة، والسقف يمنع أن ينزلق أحدها |
| شريط الحالة | اقصصه أو اتركه — **ولكن بنفس الاختيار في كل اللقطات** | الاختلاف في القصّ يجعل الصفوف غير مستوية |
| السمة | الداكنة افتراضيًّا · ولقطتان للوضع الفاتح باسم ينتهي بـ`-light` | التطبيق يعمل بالثيمَين، ولقطة واحدة لا تُثبتهما |
| اللغة | لقطتان أو ثلاث بالعربية (RTL) | RTL عقد في المستودع (`tools/rtl_guard.py`) ويستحقّ أن يُرى |

## اللقطات الثنتان والسبعون

| # | الملفّ | الشاشة | مسارها في التنقّل |
| --- | --- | --- | --- |
| 01 | `01-start.png` | شاشة البداية | `get_started` |
| 02 | `02-now-home.png` | الشاشة الرئيسية | `now` |
| 03 | `03-max-ai.png` | Max AI — نظرة عامة | `max_ai` |
| 04 | `04-max-ai-plan.png` | Max AI — الخطة والأوزان | `max_ai` |
| 05 | `05-max-ai-live.png` | مركز القيادة الحيّ | `max_live` |
| 06 | `06-max-ai-loops.png` | حصيلة الحلقات | `max_live` |
| 07 | `07-control-hub.png` | شاشة التحكّم — فهرس المجالات | `control` |
| 08 | `08-control-lanes.png` | مسارات التحكّم — بقية المجالات | `control` |
| 09 | `09-control-tools.png` | أدوات التحكّم | `control` |
| 10 | `10-control-tools-2.png` | أدوات التحكّم — تتمّة | `control` |
| 11 | `11-control-hub-2.png` | فهرس التحكّم على مقاس آخر | `control` |
| 12 | `12-hub-display.png` | مجال العرض | `hub_display` |
| 13 | `13-hub-responsiveness.png` | مجال الاستجابة | `hub_responsiveness` |
| 14 | `14-hub-power.png` | مجال الطاقة | `hub_power` |
| 15 | `15-cpu-cores.png` | شبكة الأنوية | `cpucorecontrol` |
| 16 | `16-core-limits.png` | حدود التردد للأنوية | `cpucorecontrol` |
| 17 | `17-cpu-preference-tweaks.png` | تحسينات الخصائص | `preferenced` |
| 18 | `18-gpu-studio-profiles.png` | استوديو الرسوميات — الأنماط | `gpustudio` |
| 19 | `19-gpu-studio-live.png` | استوديو الرسوميات — القراءة الحيّة | `gpustudio` |
| 20 | `20-memory-zram.png` | مدير ZRAM | `zrammanager` |
| 21 | `21-display-resolution.png` | الدقّة واللوحة | `resolutionscreen` |
| 22 | `22-power-charging.png` | الشحن والبطارية | `chargingscreen` |
| 23 | `23-bypass-check.png` | فحص تجاوز الشحن | `bypasschg_check` |
| 24 | `24-doze.png` | وضع Doze | `dozemode` |
| 25 | `25-sleep-policy.png` | سياسة الخمول — القائمة | `dozemode` |
| 26 | `26-apps-list.png` | قائمة التطبيقات | `apps` |
| 27 | `27-app-settings.png` | إعدادات تطبيق — الأداء | `app_settings/{pkg}` |
| 28 | `28-app-settings-display.png` | إعدادات تطبيق — العرض | `app_settings/{pkg}` |
| 29 | `29-app-settings-gaming.png` | إعدادات تطبيق — الألعاب | `app_settings/{pkg}` |
| 30 | `30-app-settings-power.png` | إعدادات تطبيق — الطاقة | `app_settings/{pkg}` |
| 31 | `31-app-settings-tune.png` | إعدادات تطبيق — الضبط المتقدّم | `app_settings/{pkg}` |
| 32 | `32-settings-root.png` | الإعدادات | `settings` |
| 33 | `33-color-palette.png` | السمة ولوحة الألوان | `color_palette` |
| 34 | `34-logs.png` | سجلّ التطبيق | `logsviewer` |
| 35 | `35-max-backup.png` | النسخ الاحتياطي — النظرة العامة | `max_backup?pkg={pkg}` |
| 36 | `36-backup-plan.png` | النسخ الاحتياطي — الجدولة وما يُنسخ | `max_backup?pkg={pkg}` |
| 37 | `37-backup-apps.png` | النسخ الاحتياطي — قائمة التطبيقات | `max_backup?pkg={pkg}` |
| 38 | `38-permissions.png` | الأذونات وعمليّات التطبيقات | `max_perms?pkg={pkg}` |
| 39 | `39-permissions-app.png` | أذونات تطبيق واحد | `max_perms?pkg={pkg}` |
| 40 | `40-permissions-2.png` | قائمة الأذونات على مقاس آخر | `max_perms?pkg={pkg}` |
| 41 | `41-activity-launcher.png` | مشغّل الأنشطة المخفيّة | `activitylauncher` |
| 42 | `42-set-edit.png` | محرّر خصائص النظام | `setedit` |
| 43 | `43-network-detail.png` | تفاصيل الشبكة والمرور | `network_detail` |
| 44 | `44-network-scheduler.png` | مجدول الشبكة ومزاحم TCP | `networkscheduler` |
| 45 | `45-storage-detail.png` | تفاصيل التخزين | `storage_detail` |
| 46 | `46-fps-overlay.png` | طبقة FPS — الإعداد | `fpsoverlay` |
| 47 | `47-fps-overlay-metrics.png` | طبقة FPS — المقاييس | `fpsoverlay` |
| 48 | `48-fps-overlay-source.png` | طبقة FPS — مصدر البيانات | `fpsoverlay` |
| 49 | `49-home-tour.png` | جولة الشاشة الرئيسية | `now` |
| 50 | `50-app-spoof.png` | إعدادات تطبيق — انتحال الجهاز | `app_settings/{pkg}` |
| 51 | `51-cpu-hub.png` | مجال المعالج | `hub_cpu` |
| 52 | `52-memory-hub.png` | مجال الذاكرة | `hub_memory` |
| 53 | `53-storage-hub.png` | مجال التخزين والتجميع | `hub_storage` |
| 54 | `54-thermal.png` | الحرارة — التفاصيل | `thermal_detail` |
| 55 | `55-memory-ufs.png` | الذاكرة و UFS | `memory_ufs` |
| 56 | `56-zram-custom.png` | ZRAM — حجم مخصّص | `zrammanager` |
| 57 | `57-canvas-custom.png` | مقاس الشاشة المخصّص | `resolutionscreen` |
| 58 | `58-backup-scope.png` | النسخ الاحتياطي — ما يُنسخ | `max_backup?pkg={pkg}` |
| 59 | `59-settings-about.png` | الإعدادات — حول التطبيق | `settings` |
| 60 | `60-settings-advanced.png` | الإعدادات — الوضع المتقدّم | `settings` |
| 61 | `61-settings-service.png` | الإعدادات — الخدمة والسجلّ | `settings` |
| 62 | `62-language.png` | اختيار اللغة | `settings` |
| 63 | `63-compiler-mode.png` | وضع التجميع (dex2oat) | `dex2oat` |
| 64 | `64-compiler-apps.png` | تجميع التطبيقات | `dex2oat` |
| 65 | `65-device-info.png` | معلومات الجهاز — الرسوميات | `device_info?section={section}` |
| 66 | `66-access-privileges.png` | الصلاحيات — Root وShizuku | `privilege` |
| 67 | `67-file-manager.png` | مدير الملفات | `filemanager` |
| 68 | `68-task-monitor.png` | مراقب المهام | `processmanager` |
| 69 | `69-audio-studio.png` | استوديو الصوت | `audio_studio` |
| 70 | `70-game-lobby.png` | لوبي الألعاب — أفقية | `gamelobby` |
| 71 | `71-game-launch.png` | بدء تشغيل اللعبة — أفقية | `gamelobby` |
| 72 | `72-game-panel.png` | اللوحة الجانبية أثناء اللعب — أفقية | `gamelobby` |

**الأسماء أعلاه هي العقد.** ومسار كل شاشة مذكور في العمود الأخير لأن مصدره واحد في المستودع:
`ui/navigation/MaxDestinations.kt` — فبإمكان أي مراجع أن يتحقّق أنّ الشاشة المطلوبة موجودة فعلًا.
وثلاث لقطات تُشير إلى المسار نفسه كما يُشير إليه أكثر من إطار في العقد: تابّات إعدادات التطبيق الخمسة
مسارها واحد (`app_settings/{pkg}`)، وأربع شاشات لمسار `control`، وثلاث لمسار `fpsoverlay`.

ولقطة الوضع الفاتح تُسمّى باسمها + `-light` (مثال: `02-now-home-light.png`)، ولقطة RTL بالعربية
+ `-ar` (مثال: `15-cpu-cores-ar.png`). ولا واحدة منها موجودة بعد: الشبكة تقول ذلك بنفسها ولا تدّعيه.

## ما لا يُوضع هنا

- **لا معرّف جهاز ولا رقم IMEI ولا بريد ولا اسم حزمة خاصّة بك.** شاشة التطبيقات تعرض ما هو مثبَّت على
  جهازك — راجعها قبل الدفع. هذا المجلّد يُنشر مع المستودع.
- **لا صور لمنتج آخر** ولا لقطات من ROM آخر تُنسَب إلى هنا.
- **ولا رقم إصدار مكتوب في الصورة** إن أمكن: الصورة تبقى صالحة عبر الإصدارات.

> **القاعدة أعلاه وواقع هذه اللقطات، مُعلَنًا لا مسكوتًا عنه.** لقطات القوائم هنا (٢٦ التطبيقات ·
> ٣٨/٤٠ الأذونات · ٣٧ النسخ · ٢٥ سياسة الخمول) تُظهر تطبيقات مثبَّتة على جهاز المالك، وفي `34-logs.png`
> سطرُ سجلّ يحمل مسار مجلّد محليّ. وقد عُرض ذلك على المالك صريحًا **فقَرَّر نشرها كما هي**، وأسماء الحزم
> فيها تجاريّة لا معرّفات شخصيّة. ومن أراد مجلّدًا بلا قوائم أبدًا فليطلب الحذف — وهو حذفٌ لملفّات
> وأربعة أسطر في العقد، لا إعادة تصميم.

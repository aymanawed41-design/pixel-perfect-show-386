import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import deptLogo from "@/assets/dept-logo.jpg.asset.json";
import speaker from "@/assets/speaker.png.asset.json";
import logos from "@/assets/logos.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "جلسة تعريفية | هندسة القوى والآلات الكهربية - جامعة المنصورة" },
      {
        name: "description",
        content:
          "جلسة تعريفية لطلاب هندسة القوى والآلات الكهربية بجامعة المنصورة: المسار الأكاديمي، المذاكرة، سوق العمل، والتوازن النفسي.",
      },
      { property: "og:title", content: "جلسة تعريفية | هندسة القوى والآلات الكهربية" },
      {
        property: "og:description",
        content: "دليل أكاديمي وعملي ونفسي لطلاب قسم القوى والآلات الكهربية — جامعة المنصورة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

const TOTAL = 9;

function Slide({ index, children }: { index: number; children: ReactNode }) {
  return (
    <section className="deck-slide" aria-label={`شريحة ${index}`}>
      <img className="deck-logo" src={deptLogo.url} alt="شعار القسم" />
      <div className="w-full max-w-[1080px] mx-auto">{children}</div>
      <div className="deck-num">
        {String(index).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
      </div>
    </section>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="deck-kicker">
      <span aria-hidden>⚡</span> {children}
    </div>
  );
}

function Deck() {
  const [current, setCurrent] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  const goTo = useCallback((i: number) => {
    const el = refs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let best = 0;
      let bestTop = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const top = Math.abs(el.getBoundingClientRect().top);
        if (top < bestTop) {
          bestTop = top;
          best = i;
        }
      });
      setCurrent(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "PageDown") goTo(Math.min(current + 1, TOTAL - 1));
      if (e.key === "ArrowRight" || e.key === "PageUp") goTo(Math.max(current - 1, 0));
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(TOTAL - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  const slides: ReactNode[] = [
    // 1 — TITLE
    <Slide index={1} key="s1">
      <div className="deck-title-wrap">
        <div>
          <div className="deck-eyebrow">كلية الهندسة — جامعة المنصورة</div>
          <h1 className="deck-title-h1">
            أهلاً بيكم في
            <br />
            <em>هندسة القوى والآلات الكهربية</em>
          </h1>
          <p className="deck-subtitle">
            جلسة تعريفية لطلاب الفرقة التالتة — دليلكم الأكاديمي والعملي والنفسي علشان
            السنين الجاية تعدي صح.
          </p>
          <div className="deck-speaker">
            <div>
              <b>أيمن عوض</b>
              <span>Managing Director · خريج الجامعة الأمريكية بالقاهرة (AUC)</span>
            </div>
          </div>
        </div>

        <div>
          <div className="deck-portrait-frame">
            <img className="deck-portrait" src={speaker.url} alt="أيمن عوض" />
          </div>
          <div className="deck-logos">
            <div className="deck-logos-label">الخلفية والخبرات السابقة</div>
            <img src={logos.url} alt="AUC · ReNile · Elsewedy Electric · TEXVIA · Change" />
          </div>
        </div>
      </div>
    </Slide>,

    // 2
    <Slide index={2} key="s2">
      <Kicker>افتتاحية</Kicker>
      <h2 className="deck-h">مش هقولكم &quot;أنا أعرف كل حاجة&quot;</h2>
      <p className="deck-lead">
        هقولكم &quot;أنا عديت اللي هتعدوه، وهقولكم اللي اتعلمته من غلطاتي وغلطات زمايلي&quot;.
        الجلسة دي مش بس أكاديمية — دي كمان نفسية وعملية وأخلاقية، عشان محدش يحس إنه لوحده في
        الرحلة دي.
      </p>
      <blockquote className="deck-quote">السنين دي بتعدي، واللي قدامكم صعب... بس ممكن.</blockquote>
      <div className="deck-grid deck-cols-3">
        <div className="deck-card">
          <h3>🎓 أكاديمي</h3>
          <p>إزاي تذاكر صح وتختار مساراتك من دلوقتي.</p>
        </div>
        <div className="deck-card">
          <h3>🧭 عملي</h3>
          <p>خبرة سوق العمل والتدريب الصيفي والفرص.</p>
        </div>
        <div className="deck-card">
          <h3>🤝 نفسي وأخلاقي</h3>
          <p>التوازن، الأمانة العلمية، ودعم بعض.</p>
        </div>
      </div>
    </Slide>,

    // 3
    <Slide index={3} key="s3">
      <Kicker>نظرة عامة</Kicker>
      <h2 className="deck-h">هيكل البرنامج والمقررات الاختيارية</h2>
      <p className="deck-lead">
        5 سنين (إعدادي + 4 فرق)، فيها مواد تقيلة زي الآلات ونظم القوى، ومواد أخف. الجزء المهم
        دلوقتي هو الاختياريات التلاتة.
      </p>
      <div className="deck-grid deck-cols-3">
        <div className="deck-card">
          <span className="deck-pill">اختياري 1</span>
          <ul>
            <li>الشبكات الذكية</li>
            <li>تحلية المياه</li>
            <li>السيارات الكهربية</li>
            <li>تصميم شبكات الجهد المنخفض</li>
          </ul>
        </div>
        <div className="deck-card">
          <span className="deck-pill">اختياري 2</span>
          <ul>
            <li>إلكترونيات القوى في النقل</li>
            <li>تقنيات تخزين الطاقة</li>
            <li>تصميم الآلات بالكمبيوتر</li>
            <li>الظواهر العابرة</li>
          </ul>
        </div>
        <div className="deck-card">
          <span className="deck-pill">اختياري 3</span>
          <ul>
            <li>الذكاء الاصطناعي في الطاقة</li>
            <li>الحفاظ على الطاقة وإدارتها</li>
            <li>الجر الكهربائي</li>
            <li>تخطيط أنظمة القوى</li>
          </ul>
        </div>
      </div>
      <div className="deck-callout">
        <span aria-hidden>💡</span>
        <div>
          <b>نصيحة:</b> اختار حسب مجال الشغل اللي حابب تدخله بعدين، مش حسب &quot;الأسهل&quot; —
          حابب Automation؟ روح ناحية التحكم والذكاء الاصطناعي. حابب Renewable؟ الشبكات الذكية
          وتخزين الطاقة أقرب ليك.
        </div>
      </div>
    </Slide>,

    // 4
    <Slide index={4} key="s4">
      <Kicker>عادات المذاكرة</Kicker>
      <h2 className="deck-h">إزاي تذاكر صح من دلوقتي</h2>
      <div className="deck-grid deck-cols-2">
        <div className="deck-card">
          <h3>📅 من أول أسبوع</h3>
          <p>مش من نص الترم — المواد الهندسية بتتراكم وصعب تلحقها آخر الترم.</p>
        </div>
        <div className="deck-card">
          <h3>🧠 افهم قبل ما تحفظ</h3>
          <p>خصوصاً في الدوائر والآلات، الفهم بيوفر وقت مضاعف وقت الامتحان.</p>
        </div>
        <div className="deck-card">
          <h3>✍️ حل بإيدك</h3>
          <p>الفرق بين طالب وطالب هو عدد المسائل اللي حلها لوحده، مش اللي شافها.</p>
        </div>
        <div className="deck-card">
          <h3>👥 جروب صغير (2-4)</h3>
          <p>كل واحد يذاكر لوحده الأول، وبعدين يناقشوا مع بعض.</p>
        </div>
        <div className="deck-card">
          <h3>🎥 مصادر إضافية</h3>
          <p>اليوتيوب فيه قنوات كويسة للآلات والدوائر، متعتمدش بس على المحاضرة.</p>
        </div>
        <div className="deck-card">
          <h3>🔁 راجع أول بأول</h3>
          <p>وقت أسبوعي بسيط لمراجعة اللي أخدته الأسبوع اللي فات.</p>
        </div>
      </div>
    </Slide>,

    // 5
    <Slide index={5} key="s5">
      <Kicker>الدكاترة والامتحانات</Kicker>
      <h2 className="deck-h">الدكاترة والمواد</h2>
      <p className="deck-lead">
        اتكلم عن أسلوب كل دكتور، مش شخصيته — &quot;بيحب التفاصيل في الإجابة&quot; أفضل من أي كلام
        شخصي.
      </p>
      <div className="deck-grid deck-cols-2">
        <div className="deck-card">
          <h3>🔍 تقيل في الشرح ≠ تقيل في التصحيح</h3>
          <p>في دكاترة بيشرحوا صعب بس بيصححوا بعدل، والعكس صحيح.</p>
        </div>
        <div className="deck-card">
          <h3>🗣️ اسأل الدفعات اللي فاتت</h3>
          <p>عن أسلوب الامتحانات، مش بس &quot;مين اللي بيرسب الناس&quot;.</p>
        </div>
      </div>
      <div className="deck-callout">
        <span aria-hidden>⚠️</span>
        <div>
          <b>احذر:</b> إشاعات المواد &quot;الوحش&quot; أحياناً بتبقى سمعة أكبر من حقيقتها —
          المذاكرة صح بتفرق مهما كانت المادة.
        </div>
      </div>
    </Slide>,

    // 6
    <Slide index={6} key="s6">
      <Kicker>العمل الجماعي</Kicker>
      <h2 className="deck-h">التعامل مع بعض ومواقف صعبة</h2>
      <p className="deck-lead">
        فرق الجروبات، الخلاف على الدرجات، الضغط قبل الامتحانات — كلها مواقف طبيعية، المهم إزاي
        تتعامل معاها.
      </p>
      <div className="deck-vs">
        <div className="deck-vs-card deck-vs-good">
          <h3>✅ منافسة شريفة</h3>
          <ul>
            <li>مشاركة المعلومات والملازم</li>
            <li>شرح المواد لبعض</li>
            <li>تقسيم شغل المشروع بعدل</li>
            <li>الرجوع للدكتور بأسلوب محترم</li>
          </ul>
        </div>
        <div className="deck-vs-mid">VS</div>
        <div className="deck-vs-card deck-vs-bad">
          <h3>✗ منافسة سامة</h3>
          <ul>
            <li>إخفاء المعلومات عن الزميل</li>
            <li>تفشيل الزميل قصداً</li>
            <li>تحميل واحد الحمل كله</li>
            <li>الهجوم بدل الحوار</li>
          </ul>
        </div>
      </div>
    </Slide>,

    // 7
    <Slide index={7} key="s7">
      <Kicker>التوازن</Kicker>
      <h2 className="deck-h">الصحة والوقت والنفس</h2>
      <p className="deck-lead">
        النوم الكافي، الرياضة، والوقت مع الأصحاب مش رفاهية — دي اللي بتمنع الاحتراق النفسي. وده
        امتى بييجي الضغط عادة:
      </p>
      <div className="mt-6">
        {[
          ["قبل النهائي بأسبوعين", "خصوصاً لو التذاكر اتأجل — ده وقت التوتر الطبيعي."],
          ["وقت تسليم المشاريع", "لما بتتزامن مع مواد تانية وامتحانات."],
          ["اختيار المقررات", "لما محدش يبقى متأكد من قراره — استشر اللي قبلك."],
        ].map(([when, body], i, arr) => (
          <div className="deck-t-item" key={when}>
            <div className="deck-t-when">{when}</div>
            <div className="deck-t-line">
              <span className="deck-t-dot" />
              {i < arr.length - 1 && <span className="deck-t-rail" />}
            </div>
            <div className="deck-t-body">{body}</div>
          </div>
        ))}
      </div>
      <div className="deck-callout">
        <span aria-hidden>🫱</span>
        <div>
          <b>مفيش عيب:</b> لو حسيت إن الضغط زاد عن اللزوم، اتكلم مع صحاب أو اطلب مساعدة من مرشد
          أكاديمي أو حد متخصص.
        </div>
      </div>
    </Slide>,

    // 8
    <Slide index={8} key="s8">
      <Kicker>بعد التخرج</Kicker>
      <h2 className="deck-h">سوق العمل والتدريب الصيفي</h2>
      <div className="deck-grid deck-cols-3">
        <div className="deck-card">
          <h3>🔌 Distribution</h3>
          <p>قريب من شركات الكهرباء والمرافق — يحتاج نظم توزيع وحماية.</p>
        </div>
        <div className="deck-card">
          <h3>🤖 Automation</h3>
          <p>قريب من الصناعة — نظم تحكم آلي، PLC، وأنظمة مدمجة.</p>
        </div>
        <div className="deck-card">
          <h3>☀️ PV / متجددة</h3>
          <p>سوق بينمو بسرعة في مصر — توليد، تخزين، وشبكات ذكية.</p>
        </div>
      </div>
      <div className="deck-grid deck-cols-2">
        <div className="deck-card">
          <h3>🛠️ استغل كل صيف</h3>
          <p>التدريب الصيفي مطلوب في اللائحة أصلاً — استغله صح، مش بس &quot;توقيع&quot;.</p>
        </div>
        <div className="deck-card">
          <h3>🔗 CV + LinkedIn</h3>
          <p>اعمل CV بسيط وواضح، وتواصل مع مهندسين ودكاترة تطلب نصايح مش بس فرص.</p>
        </div>
      </div>
    </Slide>,

    // 9
    <Slide index={9} key="s9">
      <Kicker>ختام</Kicker>
      <h2 className="deck-h">دورك دلوقتي</h2>
      <p className="deck-lead">
        إحنا وباقي قيادات الدفعات فوق موجودين للمتابعة، مش بس في الجلسة دي. النهاردة نفتح المجال
        للأسئلة — وده غالباً أهم جزء بالنسبالكم.
      </p>
      <blockquote className="deck-quote">
        الصبر جزء أساسي من الرحلة — قارن تقدمك بنفسك، مش بغيرك.
      </blockquote>
      <div className="mt-7 flex flex-wrap gap-3">
        <span className="deck-chip">💬 جروب واتساب للدفعة</span>
        <span className="deck-chip">📢 قناة تليجرام للتحديثات</span>
        <span className="deck-chip">❓ وقت مفتوح للأسئلة</span>
      </div>
    </Slide>,
  ];

  return (
    <div className="deck-root" dir="rtl" lang="ar">
      {slides.map((s, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          {s}
        </div>
      ))}

      <nav className="deck-nav" aria-label="التنقل بين الشرائح">
        <button
          className="deck-btn"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="السابق"
        >
          ›
        </button>
        <div className="deck-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className="deck-dot"
              data-active={i === current}
              onClick={() => goTo(i)}
              aria-label={`اذهب للشريحة ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="deck-btn"
          onClick={() => goTo(current + 1)}
          disabled={current === TOTAL - 1}
          aria-label="التالي"
        >
          ‹
        </button>
      </nav>
    </div>
  );
}

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowLeft,
  Check,
  Gift,
  Heart,
  HeartHandshake,
  ImagePlus,
  Music2,
  Sparkles,
  Star,
  Sun,
  Upload,
  X,
} from "lucide-react";

type PhotoItem = { id: string; url: string; name: string };

const promises = [
  {
    icon: HeartHandshake,
    eyebrow: "أول وعد",
    title: "مش هتكوني لوحدك",
    text: "في أي وقت وأي مكان، هتلاقيني جنبك. في ضحكتك قبل دموعك، وفي كل خطوة بتخديها.",
  },
  {
    icon: Sun,
    eyebrow: "ثاني وعد",
    title: "أحلامك مهمة",
    text: "اتمني براحتك يا شاهندا، واحلمي أكبر ما تقدري. أنا مصدق فيكي، وهفضل أشجعك لحد ما توصلي.",
  },
  {
    icon: Star,
    eyebrow: "ثالث وعد",
    title: "زعلِك ما يطولش",
    text: "مش عايز أشوفك زعلانة أبدًا. ولو الدنيا تقّلت عليكي، أنا هنا أخففها معاكي واحدة واحدة.",
  },
];

const memories = [
  "ضحكتنا اللي بتبدأ من ولا حاجة وتخلص بدموع من كتر الضحك.",
  "كل مرة وقفنا جنب بعض فيها من غير ما نحتاج نتكلم كتير.",
  "التفاصيل الصغيرة اللي مخليانا أخوات وصحاب في نفس الوقت.",
];

export default function Home() {
  const [isRoseIntroOpen, setIsRoseIntroOpen] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [wishSent, setWishSent] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [songUrl, setSongUrl] = useState("");
  const [songName, setSongName] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!songUrl || !audioRef.current) return;
    audioRef.current.play().catch(() => undefined);
  }, [songUrl]);

  const addPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith("image/"));
    const nextPhotos = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos((current) => [...current, ...nextPhotos]);
    event.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((current) => {
      const photo = current.find((item) => item.id === id);
      if (photo) URL.revokeObjectURL(photo.url);
      return current.filter((item) => item.id !== id);
    });
  };

  const addSong = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (songUrl) URL.revokeObjectURL(songUrl);
    setSongUrl(URL.createObjectURL(file));
    setSongName(file.name);
  };

  const scrollToLetter = () => {
    document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
  };

  const sendWish = () => {
    setWishSent(true);
    window.setTimeout(() => setWishSent(false), 4600);
  };

  const unlockPage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.trim() === "شاهندا") {
      setIsUnlocked(true);
      setPasswordError(false);
      return;
    }
    setPasswordError(true);
  };

  if (isRoseIntroOpen) {
    return (
      <main dir="rtl" className="rose-intro">
        <div className="rose-intro-glow" aria-hidden="true" />
        <div className="rose-intro-sparkle sparkle-a" aria-hidden="true">✦</div>
        <div className="rose-intro-sparkle sparkle-b" aria-hidden="true">✧</div>
        <section className="rose-intro-card" aria-label="وردة افتتاحية لشاهندا">
          <p className="rose-intro-kicker">هدية صغيرة لأغلى الناس</p>
          <div className="rose-frame">
            <img src="/manus-storage/shahenda-brown-rose_89b079f9.png" alt="وردة بنية واقعية لشاهندا" />
          </div>
          <h1>وردة ليكي<br /><span>يا شاهندا.</span></h1>
          <p>عشان كل حاجة حلوة شبهك… وتستاهل بداية حلوة زي دي.</p>
          <button className="rose-open-button" onClick={() => setIsRoseIntroOpen(false)}>
            ادخلي للمفاجأة <ArrowLeft size={17} />
          </button>
          <div className="rose-intro-footer"><Heart size={13} fill="currentColor" /> معمولة بحب مخصوص ليكي</div>
        </section>
      </main>
    );
  }

  if (!isUnlocked) {
    return (
      <main dir="rtl" className="password-gate">
        <div className="gate-orb gate-orb-one" aria-hidden="true" />
        <div className="gate-orb gate-orb-two" aria-hidden="true" />
        <div className="gate-sparkle sparkle-a" aria-hidden="true">✦</div>
        <div className="gate-sparkle sparkle-b" aria-hidden="true">✧</div>
        <section className="gate-card" aria-label="صفحة إدخال كلمة السر">
          <div className="gate-heart"><Heart fill="currentColor" size={31} /></div>
          <p className="gate-kicker">رسالة سرية معمولة بحب</p>
          <h1>كل سنة وإنتي طيبة<br /><span>يا أغلى الناس.</span></h1>
          <p className="gate-name">شاهندا</p>
          <p className="gate-description">اكتبي اسمك عشان تفتحي الرسالة اللي مستنياكي جوا ♡</p>
          <form onSubmit={unlockPage} className="password-form">
            <label htmlFor="birthday-password">كلمة السر</label>
            <input
              id="birthday-password"
              type="text"
              value={password}
              onChange={(event) => { setPassword(event.target.value); setPasswordError(false); }}
              placeholder="اكتبي: شاهندا"
              autoComplete="off"
              autoFocus
              aria-invalid={passwordError}
            />
            {passwordError && <p className="password-error">الكلمة مش دي… جربي اسمك يا قمر ♡</p>}
            <button type="submit" className="gate-button">افتحي رسالتي <ArrowLeft size={17} /></button>
          </form>
          <div className="gate-footer"><Sparkles size={14} /> كل اللي جوا معمول مخصوص عشانك <Sparkles size={14} /></div>
        </section>
      </main>
    );
  }

  return (
    <main dir="rtl" className="birthday-page">
      <div className="grain" aria-hidden="true" />
      <div className="floating-heart heart-one" aria-hidden="true"><Heart fill="currentColor" /></div>
      <div className="floating-heart heart-two" aria-hidden="true"><Heart fill="currentColor" /></div>
      <div className="floating-star star-one" aria-hidden="true"><Sparkles /></div>
      <div className="floating-star star-two" aria-hidden="true"><Sparkles /></div>

      <nav className="topbar" aria-label="التنقل في الصفحة">
        <a className="brand-mark" href="#top" aria-label="العودة إلى بداية الصفحة">
          <span className="brand-icon"><Heart fill="currentColor" size={17} /></span>
          <span>لشاهندا، بحب</span>
        </a>
        <div className="topbar-note"><span className="live-dot" /> رسالة معمولة مخصوص عشانك</div>
      </nav>

      <section id="top" className="hero-section section-shell">
        <div className="hero-copy reveal-up">
          <p className="eyebrow"><span className="eyebrow-line" /> يومك الحلو وصل <span className="eyebrow-line" /></p>
          <h1>
            كل سنة وإنتِ
            <span className="title-accent"> طيبة يا شاهندا</span>
          </h1>
          <p className="hero-lead">
            لأغلى أخت وصاحبة، للحد اللي وجوده في حياتي بيخلّي كل حاجة أهون وأحلى.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={scrollToLetter}>
              <span>افتحي رسالتي</span>
              <ArrowLeft size={18} />
            </button>
            <a className="text-link" href="#promises">شوفي وعودي ليكي <ArrowDown size={16} /></a>
          </div>
          <div className="hero-signature"><span>من الشخص اللي محظوظ إنك في حياته</span><span className="signature-line" /></div>
        </div>

        <div className="hero-art reveal-up delay-one" aria-label="بطاقة تهنئة مرسومة لشاهندا">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="sun-disc"><Sun size={25} strokeWidth={1.5} /></div>
          <div className="mini-label">Birthday girl</div>
          <div className="postcard">
            <div className="postcard-top"><span>26 / 09</span><span className="postcard-stamp">♡</span></div>
            <div className="postcard-heart"><Heart fill="currentColor" size={56} strokeWidth={1.4} /></div>
            <p className="postcard-script">You make life<br /><em>softer & brighter.</em></p>
            <div className="postcard-bottom"><span>أختي • صحبتي</span><span>♡</span></div>
          </div>
          <div className="art-note note-top"><Sparkles size={15} /> أغلى حد</div>
          <div className="art-note note-bottom"><span>لما الدنيا تضيق</span><strong>أنا معاكي</strong></div>
        </div>
      </section>

      <section className="intro-strip section-shell">
        <div className="strip-icon"><Gift size={23} /></div>
        <div>
          <p className="strip-kicker">النهاردة مش يوم عادي</p>
          <p className="strip-text">النهاردة اليوم اللي بنحتفل فيه بوجود إنسانة غالية زيك في الدنيا.</p>
        </div>
        <div className="strip-sparkles"><Sparkles size={18} /><Sparkles size={11} /></div>
      </section>

      <section id="photos" className="photos-section section-shell">
        <div className="section-heading photos-heading">
          <div>
            <p className="eyebrow compact"><span className="eyebrow-line" /> صورنا الحلوة</p>
            <h2>ذكرياتنا في<br /><span>أجمل إطار.</span></h2>
          </div>
          <p className="section-index">01 <span>/</span> 05</p>
        </div>

        <div className="photo-upload-card">
          {photos.length === 0 ? (
            <div className="photo-empty-state">
              <div className="upload-icon"><ImagePlus size={28} /></div>
              <div>
                <h3>حطي صوركم هنا</h3>
                <p>اختاري صورة أو أكتر من جهازك، وهيظهروا هنا بتأثيرات لطيفة.</p>
              </div>
              <label className="upload-button">
                <Upload size={17} />
                اختاري الصور
                <input type="file" accept="image/*" multiple onChange={addPhotos} />
              </label>
            </div>
          ) : (
            <>
              <div className="photo-grid">
                {photos.map((photo, index) => (
                  <figure className={`photo-tile photo-tile-${(index % 4) + 1}`} key={photo.id}>
                    <img src={photo.url} alt={`ذكرى ${index + 1} مع شاهندا`} />
                    <button className="remove-photo" type="button" onClick={() => removePhoto(photo.id)} aria-label={`حذف ${photo.name}`}><X size={14} /></button>
                    <figcaption>ذكرى حلوة ♡</figcaption>
                  </figure>
                ))}
              </div>
              <label className="add-more-button">
                <ImagePlus size={16} /> أضيفي صور أكتر
                <input type="file" accept="image/*" multiple onChange={addPhotos} />
              </label>
            </>
          )}
        </div>
        <p className="upload-tip"><Sparkles size={13} /> الصور بتفضل عندك على الجهاز ومش بتترفع لأي مكان.</p>
      </section>

      <section className="music-section section-shell">
        <div className="music-card">
          <div className="music-disc"><Music2 size={26} /><span /></div>
          <div className="music-copy">
            <p className="eyebrow compact"><span className="eyebrow-line" /> أغنية ليكي</p>
            <h2>خلي في موسيقى<br /><span>للذكرى دي.</span></h2>
            <p>اختاري أغنيتكم من جهازك، وهتحاول تشتغل تلقائيًا أول ما الصفحة تفتح عندك.</p>
            <label className="song-picker">
              <Music2 size={16} />
              {songName ? "غيّري الأغنية" : "اختاري أغنية من جهازك"}
              <input type="file" accept="audio/*" onChange={addSong} />
            </label>
            {songName && <span className="song-name">♪ {songName}</span>}
          </div>
          <div className="music-note note-a">♪</div>
          <div className="music-note note-b">♫</div>
          {songUrl && <audio ref={audioRef} src={songUrl} controls autoPlay loop className="audio-player" />}
        </div>
        <p className="music-tip"><Music2 size={13} /> لو الموبايل منع التشغيل التلقائي، دوسي تشغيل مرة واحدة وهتكمل الأغنية عادي.</p>
      </section>

      <section id="letter" className="letter-section section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow compact"><span className="eyebrow-line" /> من قلبي ليكي</p>
            <h2>رسالة صغيرة…<br /><span>بس جواها كلام كتير.</span></h2>
          </div>
          <p className="section-index">02 <span>/</span> 05</p>
        </div>

        <div className={`letter-card ${isLetterOpen ? "is-open" : ""}`}>
          <div className="letter-ribbon"><span>إلى شاهندا</span><Heart size={15} fill="currentColor" /></div>
          <div className="letter-card-inner">
            <div className="letter-meta"><span>من أخوكي وصاحبك</span><span>بحب كبير جدًا</span></div>
            <div className="letter-content">
              <p className="letter-greeting">يا شاهندا،</p>
              <p>كل سنة وإنتِ طيبة يا أجمل أخت وأقرب صاحبة. مش عارف أقولك إيه يليق بكل اللي جوايا ليكي، بس عارف حاجة واحدة أكيدة: <strong>إنتِ من أغلى الناس عندي، ووجودك في حياتي نعمة كبيرة أوي.</strong></p>
              <p>عايزك تصبري وماتشيليش هم أي حاجة طول ما أنا معاكي. مهما الدنيا عملت أو الأيام حاولت تتعبك، افتكري إن في حد هنا بيحبك بجد، سامعك، مصدقك، ومستعد يمشي معاكي في كل خطوة.</p>
              <div className="quote-line"><span>“</span><p>اتمني أي حاجة يا حبيبتي… وأنا أجيبها لكِ، أو على الأقل أفضل أحاول لحد ما أفرّح قلبك.</p></div>
              {isLetterOpen && (
                <div className="letter-more">
                  <p>إنتِ مش بس أختي، إنتِ صاحبتي اللي بعرف أكون معاها على طبيعتي. ضحكتك بتفرّق، وكلامك بيفرق، وحتى سكوتك له مكان خاص عندي. عشان كده مش عايزك تزعلي أبدًا، ولو حصل وزعلتي، تعالي لي من غير تفكير.</p>
                  <p>في عيد ميلادك بتمنى لكِ سنة شبه قلبك: جميلة، هادية، ومليانة حاجات حلوة تستاهليها. سنة تلاقي فيها نفسك أقرب لكل حلم، وتعرفي قد إيه إنتِ محبوبة ومهمة.</p>
                  <p>وعد مني: هفضل سندك، وأفرح لفرحك، وأطبطب عليكي في أيامك الصعبة. كل سنة وإنتِ أختي وصحبتي وحبيبتي، وكل سنة وأنا بشكر ربنا إنك في حياتي.</p>
                </div>
              )}
              <p className="letter-signoff">بحبك يا شاهندا<br /><span>كل سنة وإنتِ منوّرة حياتي ♡</span></p>
            </div>
            <button className="letter-toggle" onClick={() => setIsLetterOpen(!isLetterOpen)} aria-expanded={isLetterOpen}>
              {isLetterOpen ? "اقفلي الرسالة براحة" : "كمّلي قراءة الرسالة"}
              <ArrowDown size={16} className={isLetterOpen ? "rotate-180" : ""} />
            </button>
          </div>
          <div className="letter-flower flower-a">✽</div>
          <div className="letter-flower flower-b">✿</div>
        </div>
      </section>

      <section id="promises" className="promises-section section-shell">
        <div className="section-heading promises-heading">
          <div>
            <p className="eyebrow compact"><span className="eyebrow-line" /> خديها مني وعد</p>
            <h2>حاجات لازم <span>تفضلي عارفاها.</span></h2>
          </div>
          <p className="section-index">03 <span>/</span> 05</p>
        </div>
        <div className="promise-grid">
          {promises.map(({ icon: Icon, eyebrow, title, text }, index) => (
            <article className={`promise-card card-${index + 1}`} key={title}>
              <div className="promise-icon"><Icon size={22} strokeWidth={1.7} /></div>
              <p className="card-eyebrow">{eyebrow}</p>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="card-number">0{index + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="memories-section section-shell">
        <div className="memory-visual">
          <div className="memory-circle circle-large" />
          <div className="memory-circle circle-small" />
          <div className="memory-note"><Heart fill="currentColor" size={18} /><span>أختي + صحبتي<br /><b>للأبد</b></span></div>
          <p className="memory-vertical">little things / big love</p>
        </div>
        <div className="memory-copy">
          <p className="eyebrow compact"><span className="eyebrow-line" /> عشان إحنا</p>
          <h2>أحلى حاجة فينا<br /><span>إننا إحنا.</span></h2>
          <p className="memory-intro">مش محتاجين مناسبة عشان أقولك إنك غالية. بس عيد ميلادك فرصة حلوة أفكّرك بالحاجات اللي بتخلّي علاقتنا مميزة أوي.</p>
          <ul className="memory-list">
            {memories.map((memory) => <li key={memory}><Check size={16} /><span>{memory}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="wish-section section-shell">
        <div className="wish-card">
          <div className="wish-glow" />
          <p className="eyebrow light"><span className="eyebrow-line" /> أمنية السنة الجديدة</p>
          <h2>اتمني أي حاجة<br /><em>يا حبيبتي.</em></h2>
          <p>اتمني من قلبك، وسيبي الباقي عليا. يمكن أقدر أجيبها، ويمكن أقدر أكون جنبك وإحنا بنوصل لها سوا… بس في الحالتين، مش هسيبك لوحدك.</p>
          <button className="wish-button" onClick={sendWish}>
            <Sparkles size={18} />
            {wishSent ? "وصلت الأمنية لقلبي ♡" : "أمنية لشاهندا"}
          </button>
          {wishSent && <div className="wish-confirmation"><span>✦</span> أي أمنية منكِ أمر… وإحنا قدّها <span>✦</span></div>}
        </div>
      </section>

      <footer className="footer section-shell">
        <div className="footer-heart"><Heart fill="currentColor" size={19} /></div>
        <p>لشاهندا، اللي وجودها بيخلّي الدنيا أحنّ.</p>
        <span>صنع بحب كبير جدًا</span>
      </footer>
    </main>
  );
}

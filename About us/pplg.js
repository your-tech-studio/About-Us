const globalSlides = [
    { bg:'slide1.png', title:'Peace &amp Stability',          desc:'Egypt plays an important role in promoting peace and maintaining stability in the Middle East. Through diplomatic efforts and regional cooperation, the country supports constructive dialogue and long-term security.' },
    { bg:'slide2.png', title:'Sustainable<br>&amp; Development',  desc:'Egypt is committed to sustainable development and responsible resource management. The country supports environmental protection while pursuing long-term economic growth.' },
    { bg:'slide3.png', title:'Human Rights<br>&amp; Justice',     desc:'Egypt recognizes fundamental human rights and the importance of the rule of law. The country seeks to promote justice and equality in line with internationally recognized principles.' },
    { bg:'slide4.png', title:'International<br>Cooperation',      desc:'Egypt maintains strong partnerships with countries and international organizations to advance economic growth, education, and global development. These collaborations strengthen diplomatic relations and promote mutual progress.' },
    { bg:'slide5.png', title:'Cultural Heritage<br>Preservation', desc:"Egypt is committed to protecting and preserving its rich historical and cultural heritage for future generations. Iconic sites such as the Pyramids of Giza reflect the country's responsibility to safeguard treasures of global civilization." },
    { bg:'slide6.png', title:'Cultural Exchange<br>And Tourism',  desc:"As one of the world's great centers of ancient civilization, Egypt promotes cultural exchange through tourism, education, and the arts. Institutions such as the Egyptian Museum help share Egypt's history and cultural heritage with the global community." }
];

let gCurrent   = 0;
let gAnimating = false;

const N       = globalSlides.length;
const BIG_W   = 320;
const SMALL_W = 250;
const GAP     = 20;
const EASE    = 'cubic-bezier(0.4, 0, 0.2, 1)';

function gNextIdx(i) { return (i + 1) % N; }

function gClean(...els) {
    const props = ['transition','transitionDelay','opacity','transform','width','height','borderWidth','borderRadius'];
    els.forEach(el => props.forEach(p => el.style[p] = ''));
}

function gRenderInit() {
    const sec = document.querySelector('.global');
    sec.querySelector('.global__bg').src               = globalSlides[0].bg;
    sec.querySelector('.global__subtitle').innerHTML   = globalSlides[0].title;
    sec.querySelector('.global__text').innerHTML       = globalSlides[0].desc;
    sec.querySelector('.global__thumb-active img').src = globalSlides[0].bg;
    sec.querySelector('.global__thumb-next img').src   = globalSlides[1].bg;
}

function gSlideNormal(targetIdx, ms, onDone) {
    const sec      = document.querySelector('.global');
    const bgEl     = sec.querySelector('.global__bg');
    const titleEl  = sec.querySelector('.global__subtitle');
    const descEl   = sec.querySelector('.global__text');
    const bigThumb = sec.querySelector('.global__thumb-active');
    const smlThumb = sec.querySelector('.global__thumb-next');
    const afterIdx = gNextIdx(targetIdx);

    const off = el => { el.style.transition = 'none'; el.style.transitionDelay = '0ms'; };
    [bgEl, titleEl, descEl, bigThumb, smlThumb].forEach(off);

    requestAnimationFrame(() => requestAnimationFrame(() => {

        bgEl.style.transition = `opacity ${ms*0.5}ms ease`;
        bgEl.style.opacity    = '0';

        titleEl.style.transition     = `opacity ${ms*0.5}ms ${EASE}, transform ${ms*0.5}ms ${EASE}`;
        titleEl.style.opacity        = '0';
        titleEl.style.transform      = 'translateX(-50px)';

        descEl.style.transition      = `opacity ${ms*0.5}ms ${EASE}, transform ${ms*0.5}ms ${EASE}`;
        descEl.style.transitionDelay = '30ms';
        descEl.style.opacity         = '0';
        descEl.style.transform       = 'translateX(-50px)';

        bigThumb.style.transition = `transform ${ms}ms ${EASE}, opacity ${ms*0.6}ms ease`;
        bigThumb.style.transform  = `translateX(calc(-100% - ${GAP}px)) scale(0.7)`;
        bigThumb.style.opacity    = '0';

        smlThumb.style.transition   = `transform ${ms}ms ${EASE}, width ${ms}ms ${EASE}, height ${ms}ms ${EASE}, border-width ${ms*0.8}ms ${EASE}, border-radius ${ms}ms ${EASE}`;
        smlThumb.style.transform    = `translateX(calc(-${BIG_W}px - ${GAP}px))`;
        smlThumb.style.width        = `${BIG_W}px`;
        smlThumb.style.height       = '370px';
        smlThumb.style.borderWidth  = '8px';
        smlThumb.style.borderRadius = '32px';

        setTimeout(() => {
            bgEl.src                          = globalSlides[targetIdx].bg;
            titleEl.innerHTML                 = globalSlides[targetIdx].title;
            descEl.innerHTML                  = globalSlides[targetIdx].desc;
            bigThumb.querySelector('img').src = globalSlides[targetIdx].bg;
            smlThumb.querySelector('img').src = globalSlides[afterIdx].bg;

            [bgEl, titleEl, descEl, bigThumb, smlThumb].forEach(off);
            bgEl.style.opacity       = '0';
            titleEl.style.opacity    = '0'; titleEl.style.transform = 'translateX(50px)';
            descEl.style.opacity     = '0'; descEl.style.transform  = 'translateX(50px)';
            bigThumb.style.transform = 'none'; bigThumb.style.opacity = '0';
            smlThumb.style.transform = 'none';
            smlThumb.style.width     = `${SMALL_W}px`;
            smlThumb.style.height    = '300px';
            smlThumb.style.borderWidth   = '0px';
            smlThumb.style.borderRadius  = '32px';
            smlThumb.style.opacity   = '0';

            void sec.offsetWidth;

            requestAnimationFrame(() => requestAnimationFrame(() => {
                const tE = `${ms*0.65}ms ${EASE}`;

                bgEl.style.transition = `opacity ${ms*0.55}ms ease`;
                bgEl.style.opacity    = '1';

                titleEl.style.transition      = `opacity ${tE}, transform ${tE}`;
                titleEl.style.transitionDelay = '40ms';
                titleEl.style.opacity         = '1';
                titleEl.style.transform       = 'none';

                descEl.style.transition      = `opacity ${tE}, transform ${tE}`;
                descEl.style.transitionDelay = '80ms';
                descEl.style.opacity         = '1';
                descEl.style.transform       = 'none';

                bigThumb.style.transition      = `opacity ${ms*0.55}ms ease`;
                bigThumb.style.transitionDelay = '20ms';
                bigThumb.style.opacity         = '1';

                smlThumb.style.transition      = `opacity ${ms*0.45}ms ease`;
                smlThumb.style.transitionDelay = '60ms';
                smlThumb.style.opacity         = '1';

                const wait = ms * 0.65 + 80 + 150;
                setTimeout(() => {
                    gClean(titleEl, descEl, bigThumb, smlThumb, bgEl);
                    if (onDone) onDone();
                }, wait);
            }));
        }, ms + 20);
    }));
}

function gLoopAnimation(onDone) {
    const sec      = document.querySelector('.global');
    const bgEl     = sec.querySelector('.global__bg');
    const titleEl  = sec.querySelector('.global__subtitle');
    const descEl   = sec.querySelector('.global__text');
    const bigThumb = sec.querySelector('.global__thumb-active');
    const smlThumb = sec.querySelector('.global__thumb-next');

    const ghostImgs = [
        globalSlides[4].bg,
        globalSlides[3].bg,
        globalSlides[2].bg,
        globalSlides[1].bg,
        globalSlides[0].bg,
    ];
    let gi = 0;
    const ghostDur = 160;

    const off = el => { el.style.transition = 'none'; el.style.transitionDelay = '0ms'; };

    [bgEl, titleEl, descEl].forEach(off);
    requestAnimationFrame(() => requestAnimationFrame(() => {
        bgEl.style.transition    = 'opacity 200ms ease';
        bgEl.style.opacity       = '0.15';
        titleEl.style.transition = 'opacity 200ms ease, transform 200ms ease';
        titleEl.style.opacity    = '0';
        titleEl.style.transform  = 'translateX(-30px)';
        descEl.style.transition      = 'opacity 200ms ease, transform 200ms ease';
        descEl.style.transitionDelay = '20ms';
        descEl.style.opacity         = '0';
        descEl.style.transform       = 'translateX(-30px)';
        setTimeout(runGhost, 220);
    }));

    function runGhost() {
        if (gi >= ghostImgs.length) {
            [bgEl, titleEl, descEl].forEach(off);
            titleEl.style.opacity  = '0'; titleEl.style.transform = 'none';
            descEl.style.opacity   = '0'; descEl.style.transform  = 'none';
            bgEl.style.opacity     = '0';
            void sec.offsetWidth;
            gSlideNormal(0, 480, onDone);
            return;
        }

        const img = ghostImgs[gi++];
        const ms  = ghostDur;

        [bigThumb, smlThumb].forEach(off);
        requestAnimationFrame(() => requestAnimationFrame(() => {
            bigThumb.style.transition = `transform ${ms}ms ${EASE}, opacity ${ms*0.7}ms ease`;
            bigThumb.style.transform  = `translateX(calc(-100% - ${GAP}px)) scale(0.75)`;
            bigThumb.style.opacity    = '0';

            smlThumb.style.transition   = `transform ${ms}ms ${EASE}, width ${ms}ms ${EASE}, height ${ms}ms ${EASE}, border-width ${ms*0.8}ms ${EASE}, border-radius ${ms}ms ${EASE}`;
            smlThumb.style.transform    = `translateX(calc(-${BIG_W}px - ${GAP}px))`;
            smlThumb.style.width        = `${BIG_W}px`;
            smlThumb.style.height       = '370px';
            smlThumb.style.borderWidth  = '8px';
            smlThumb.style.borderRadius = '32px';

            setTimeout(() => {
                bigThumb.querySelector('img').src = smlThumb.querySelector('img').src;
                smlThumb.querySelector('img').src = img;

                [bigThumb, smlThumb].forEach(off);
                bigThumb.style.transform = 'none'; bigThumb.style.opacity = '0';
                smlThumb.style.transform = 'none';
                smlThumb.style.width     = `${SMALL_W}px`;
                smlThumb.style.height    = '300px';
                smlThumb.style.borderWidth   = '0px';
                smlThumb.style.borderRadius  = '32px';
                smlThumb.style.opacity   = '0';

                void sec.offsetWidth;

                requestAnimationFrame(() => requestAnimationFrame(() => {
                    bigThumb.style.transition = `opacity ${ms*0.5}ms ease`;
                    bigThumb.style.opacity    = '1';
                    smlThumb.style.transition      = `opacity ${ms*0.4}ms ease`;
                    smlThumb.style.transitionDelay = '30ms';
                    smlThumb.style.opacity         = '1';

                    const wait = ms * 0.5 + 60;
                    setTimeout(() => {
                        gClean(bigThumb, smlThumb);
                        runGhost();
                    }, wait);
                }));
            }, ms + 15);
        }));
    }
}

function gGoNext() {
    if (gAnimating) return;
    gAnimating = true;

    const isLoop  = gCurrent === N - 1;
    const nextIdx = gNextIdx(gCurrent);

    if (!isLoop) {
        gSlideNormal(nextIdx, 480, () => {
            gCurrent   = nextIdx;
            gAnimating = false;
        });
    } else {
        gLoopAnimation(() => {
            gCurrent   = 0;
            gAnimating = false;
        });
    }
}

function initGlobalSlider() {
    gRenderInit();
    document.querySelector('.global .global__thumb-next')
        .addEventListener('click', gGoNext);
}
const slides = [
    { bg:'1.jpg.jpg', title:'Faith and<br>Spiritual Life',    desc:"Most Egyptians practice Islam, which strongly influences daily life and culture. Christianity, especially the Coptic Orthodox faith, is the main minority religion and an important part of Egypt's identity." },
    { bg:'2.jpg.jpg', title:'Egypt<br>Major Profession',      desc:'Souvenir sellers are commonly found in traditional markets like Khan el-Khalili in Cairo. Bargaining is common, especially in popular tourist areas.' },
    { bg:'3.jpg.jpg', title:'Ancient Living<br>Traditions',   desc:'Sham el-Nessim is an ancient spring festival celebrated after Coptic Orthodox Easter. Families gather outdoors, dye eggs, and enjoy traditional foods together.' }
];

let cCurrent   = 0;
let cAnimating = false;

const CN      = slides.length;
const BIG_W   = 320;
const SMALL_W = 250;
const GAP     = 20;
const EASE    = 'cubic-bezier(0.4, 0, 0.2, 1)';

function cNextIdx(i) { return (i + 1) % CN; }

function cClean(...els) {
    const props = ['transition','transitionDelay','opacity','transform','width','height','borderWidth','borderRadius'];
    els.forEach(el => props.forEach(p => el.style[p] = ''));
}

function cRenderInit() {
    const sec = document.querySelector('.cslide-section');
    sec.querySelector('.cslide-bg').src                     = slides[0].bg;
    sec.querySelector('.cslide-title').innerHTML            = slides[0].title;
    sec.querySelector('.cslide-desc').textContent           = slides[0].desc;
    sec.querySelector('.cslide-thumb.active-thumb img').src = slides[0].bg;
    sec.querySelector('.cslide-thumb.next-thumb img').src   = slides[1].bg;
}

function cSlideNormal(targetIdx, ms, onDone) {
    const sec      = document.querySelector('.cslide-section');
    const bgEl     = sec.querySelector('.cslide-bg');
    const titleEl  = sec.querySelector('.cslide-title');
    const descEl   = sec.querySelector('.cslide-desc');
    const bigThumb = sec.querySelector('.cslide-thumb.active-thumb');
    const smlThumb = sec.querySelector('.cslide-thumb.next-thumb');
    const afterIdx = cNextIdx(targetIdx);
    const off = el => { el.style.transition = 'none'; el.style.transitionDelay = '0ms'; };

    [bgEl, titleEl, descEl, bigThumb, smlThumb].forEach(off);

    requestAnimationFrame(() => requestAnimationFrame(() => {
        bgEl.style.transition = `opacity ${ms*.5}ms ease`;
        bgEl.style.opacity    = '0';

        titleEl.style.transition = `opacity ${ms*.5}ms ${EASE}, transform ${ms*.5}ms ${EASE}`;
        titleEl.style.opacity    = '0';
        titleEl.style.transform  = 'translateX(-50px)';

        descEl.style.transition      = `opacity ${ms*.5}ms ${EASE}, transform ${ms*.5}ms ${EASE}`;
        descEl.style.transitionDelay = '30ms';
        descEl.style.opacity         = '0';
        descEl.style.transform       = 'translateX(-50px)';

        bigThumb.style.transition = `transform ${ms}ms ${EASE}, opacity ${ms*.6}ms ease`;
        bigThumb.style.transform  = `translateX(calc(-100% - ${GAP}px)) scale(0.7)`;
        bigThumb.style.opacity    = '0';

        smlThumb.style.transition   = `transform ${ms}ms ${EASE}, width ${ms}ms ${EASE}, height ${ms}ms ${EASE}, border-width ${ms*.8}ms ${EASE}, border-radius ${ms}ms ${EASE}`;
        smlThumb.style.transform    = `translateX(calc(-${BIG_W}px - ${GAP}px))`;
        smlThumb.style.width        = `${BIG_W}px`;
        smlThumb.style.height       = '370px';
        smlThumb.style.borderWidth  = '8px';
        smlThumb.style.borderRadius = '32px';

        setTimeout(() => {
            bgEl.src                          = slides[targetIdx].bg;
            titleEl.innerHTML                 = slides[targetIdx].title;
            descEl.textContent                = slides[targetIdx].desc;
            bigThumb.querySelector('img').src = slides[targetIdx].bg;
            smlThumb.querySelector('img').src = slides[afterIdx].bg;

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
                const tE = `${ms*.65}ms ${EASE}`;

                bgEl.style.transition = `opacity ${ms*.55}ms ease`; bgEl.style.opacity = '1';

                titleEl.style.transition = `opacity ${tE}, transform ${tE}`;
                titleEl.style.transitionDelay = '40ms';
                titleEl.style.opacity = '1'; titleEl.style.transform = 'none';

                descEl.style.transition = `opacity ${tE}, transform ${tE}`;
                descEl.style.transitionDelay = '80ms';
                descEl.style.opacity = '1'; descEl.style.transform = 'none';

                bigThumb.style.transition = `opacity ${ms*.55}ms ease`;
                bigThumb.style.transitionDelay = '20ms';
                bigThumb.style.opacity = '1';

                smlThumb.style.transition = `opacity ${ms*.45}ms ease`;
                smlThumb.style.transitionDelay = '60ms';
                smlThumb.style.opacity = '1';

                setTimeout(() => {
                    cClean(titleEl, descEl, bigThumb, smlThumb, bgEl);
                    if (onDone) onDone();
                }, ms*.65 + 80 + 150);
            }));
        }, ms + 20);
    }));
}

function cLoopAnimation(onDone) {
    const sec      = document.querySelector('.cslide-section');
    const bgEl     = sec.querySelector('.cslide-bg');
    const titleEl  = sec.querySelector('.cslide-title');
    const descEl   = sec.querySelector('.cslide-desc');
    const bigThumb = sec.querySelector('.cslide-thumb.active-thumb');
    const smlThumb = sec.querySelector('.cslide-thumb.next-thumb');
    const off = el => { el.style.transition = 'none'; el.style.transitionDelay = '0ms'; };

    const ghostImgs = [ slides[1].bg, slides[0].bg ];
    let gi = 0;
    const ghostDur = 160;

    [bgEl, titleEl, descEl].forEach(off);
    requestAnimationFrame(() => requestAnimationFrame(() => {
        bgEl.style.transition    = 'opacity 180ms ease';
        bgEl.style.opacity       = '0.1';
        titleEl.style.transition = 'opacity 180ms ease, transform 180ms ease';
        titleEl.style.opacity    = '0';
        titleEl.style.transform  = 'translateX(-30px)';
        descEl.style.transition      = 'opacity 180ms ease, transform 180ms ease';
        descEl.style.transitionDelay = '20ms';
        descEl.style.opacity         = '0';
        descEl.style.transform       = 'translateX(-30px)';
        setTimeout(runGhost, 200);
    }));

    function runGhost() {
        if (gi >= ghostImgs.length) {
            [bgEl, titleEl, descEl].forEach(off);
            bgEl.style.opacity    = '0';
            titleEl.style.opacity = '0'; titleEl.style.transform = 'none';
            descEl.style.opacity  = '0'; descEl.style.transform  = 'none';
            void sec.offsetWidth;
            cSlideNormal(0, 480, onDone);
            return;
        }

        const img = ghostImgs[gi++];
        const ms  = ghostDur;

        [bigThumb, smlThumb].forEach(off);
        requestAnimationFrame(() => requestAnimationFrame(() => {
            bigThumb.style.transition = `transform ${ms}ms ${EASE}, opacity ${ms*.7}ms ease`;
            bigThumb.style.transform  = `translateX(calc(-100% - ${GAP}px)) scale(0.75)`;
            bigThumb.style.opacity    = '0';

            smlThumb.style.transition   = `transform ${ms}ms ${EASE}, width ${ms}ms ${EASE}, height ${ms}ms ${EASE}, border-width ${ms*.8}ms ${EASE}, border-radius ${ms}ms ${EASE}`;
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
                smlThumb.style.width     = `${SMALL_W}px`; smlThumb.style.height = '300px';
                smlThumb.style.borderWidth = '0px'; smlThumb.style.borderRadius = '32px';
                smlThumb.style.opacity   = '0';

                void sec.offsetWidth;

                requestAnimationFrame(() => requestAnimationFrame(() => {
                    bigThumb.style.transition = `opacity ${ms*.5}ms ease`;
                    bigThumb.style.opacity    = '1';
                    smlThumb.style.transition      = `opacity ${ms*.4}ms ease`;
                    smlThumb.style.transitionDelay = '25ms';
                    smlThumb.style.opacity         = '1';

                    setTimeout(() => {
                        cClean(bigThumb, smlThumb);
                        runGhost();
                    }, ms*.5 + 50);
                }));
            }, ms + 15);
        }));
    }
}

function cGoNext() {
    if (cAnimating) return;
    cAnimating = true;
    if (cCurrent !== CN - 1) {
        const nextIdx = cNextIdx(cCurrent);
        cSlideNormal(nextIdx, 480, () => { cCurrent = nextIdx; cAnimating = false; });
    } else {
        cLoopAnimation(() => { cCurrent = 0; cAnimating = false; });
    }
}

function initSlider() {
    cRenderInit();
    document.querySelector('.cslide-section .cslide-thumb.next-thumb')
        .addEventListener('click', cGoNext);
}

const culinaryData = [
    { name:"Oum Ali", img:"kue.jpg", desc1:"Oum Ali is a traditional Egyptian dessert from the Mamluk era, often compared to bread pudding. Today, it is a beloved comfort food, especially during Ramadan.", desc2:"It consists of puff pastry or bread soaked in milk and cream, sweetened with sugar, and topped with nuts and raisins. Baked until golden, it has a creamy interior and a lightly crisp surface. Unlike many Western bread puddings, it usually contains no eggs.", nutrientLabel:"Key Nutrients (per serving ~478 kcal)", nutrients:["High in energy (calories) – due to cream, sugar, and pastry","High fat content – contributes to richness and texture","Moderate carbohydrates – from pastry and sugar","Good source of protein – from milk and nuts","Healthy fats & fiber – provided by nuts"], benefitLabel:"Benefits & Philosophy", benefit:"Oum Ali is a comforting, energy-rich dessert best enjoyed in moderation. Its blend of dairy and nuts provides calcium and healthy fats, making it a nourishing treat.", ingredientsBg:"ingren.jpeg", ingredients:["Puff pastry or bread pieces","Milk","Sugar","Raisins","Almonds","Pistachios","Coconut flakes (optional)","Cream (optional)","Butter"], howtoBg:"ingren1.jpeg", howto:["Preheat the oven to a medium temperature.","Tear puff pastry or bread into small pieces and place them in a baking dish.","Warm milk with sugar until the sugar dissolves.","Pour the sweetened milk over the pastry pieces.","Add raisins, almonds, pistachios, and other nuts on top.","Bake in the oven until the top becomes golden brown and slightly crispy.","Serve warm directly from the baking dish."] },
    { name:"Koshari", img:"eat.2.jpeg", desc1:"Koshari is Egypt's national dish and a popular street food that emerged in the 19th century. It reflects cultural acculturation, combining influences from Indian kichdi (rice and lentils) and Italian pasta.", desc2:"The dish consists of layered rice, macaroni, lentils, chickpeas, spiced tomato sauce, and crispy fried onions. This combination creates a balance of soft and crunchy textures with savory, tangy, and slightly spicy flavors.", nutrientLabel:"Key Nutrients (per ~400–500 g serving)", nutrients:["High in carbohydrates – primary source of energy","Plant-based protein – from lentils and chickpeas, supports tissue growth and repair","Rich in dietary fiber – aids digestion and helps regulate blood sugar","Iron & folate – support red blood cell production","Magnesium & potassium – important for muscle and nerve function"], benefitLabel:"Benefits & Philosophy", benefit:"Koshari is filling and nutritionally balanced due to its combination of grains and legumes. However, calorie content may increase depending on the amount of oil used.", ingredientsBg:"ingren.jpeg", ingredients:["Rice","Brown lentils","Macaroni or small pasta","Chickpeas","Onions","Garlic","Tomato sauce or tomato paste","Vegetable oil","Vinegar","Cumin","Coriander","Salt","Black pepper"], howtoBg:"ingren1.jpeg", howto:["Cook rice separately until soft and fluffy.","Boil brown lentils until tender.","Cook pasta in salted water until al dente.","Prepare tomato sauce by sautéing garlic in oil, then adding tomato purée, vinegar, and spices.","Slice onions thinly and fry them until crispy and golden brown.","Assemble the dish by layering rice, lentils, and pasta in a bowl.","Add chickpeas, pour the tomato sauce on top, and finish with crispy fried onions."] },
    { name:"Lemonna", img:"eat.jpeg", desc1:"Lemonna is a traditional Egyptian drink that has been consumed for decades. It was originally consumed as a natural refreshment in homes and markets, especially during the intense heat of Egypt's desert climate.", desc2:"Over time, Lemonna became popular in cafes and restaurants, and has become a symbol of Egyptian hospitality and a relaxed lifestyle. It is often enjoyed while socializing, strolling through markets, or relaxing by the river.", nutrientLabel:"Key Nutrients", nutrients:["High Vitamin C (±90–100 mg) → meets ±100% of an adult's daily needs","Antioxidants (flavonoids & rosmarinic acid) from lemon and mint","Simple carbohydrates ±50 g (from sugar)","Vitamin A from mint"], benefitLabel:"Benefits & Philosophy", benefit:"Lemonade symbolizes freshness, resilience, and positivity. Nutritionally, it helps with hydration, provides vitamin C for immune support, and offers antioxidants, making it a refreshing and revitalizing drink when consumed in moderation.", ingredientsBg:"ingren.jpeg", ingredients:["Fresh lemons","Water","Sugar","Fresh mint leaves","Ice cubes (optional)"], howtoBg:"ingren1.jpeg", howto:["Wash and cut fresh lemons in half.","Squeeze the lemons to extract the juice.","Add lemon juice, water, sugar, and fresh mint leaves into a blender.","Blend the mixture until smooth.","Add ice cubes if desired and blend briefly again.","Serve chilled in a glass and garnish with mint leaves or lemon slices."] }
];

let culCurrent   = 0;
let culAnimating = false;

function culRender(index) {
    const s = culinaryData[index];
    document.getElementById('cul-name').innerHTML   = s.name;
    document.getElementById('cul-desc1').innerHTML  = s.desc1;
    document.getElementById('cul-desc2').innerHTML  = s.desc2;
    document.getElementById('cul-label1').innerHTML = s.nutrientLabel;
    document.getElementById('cul-label2').innerHTML = s.benefitLabel;
    document.getElementById('cul-footer').innerHTML = s.benefit;
    document.getElementById('cul-img').src          = s.img;
    document.getElementById('cul-img').alt          = s.name;
    document.getElementById('cul-list').innerHTML   = s.nutrients.map(n => `<li>${n}</li>`).join('');
    const boxes = document.querySelectorAll('.culinary-info-box');
    boxes[0].querySelector('.culinary-info-img').src            = s.ingredientsBg;
    boxes[0].querySelector('.culinary-info-box-body').innerHTML = `<ul>${s.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>`;
    boxes[1].querySelector('.culinary-info-img').src            = s.howtoBg;
    boxes[1].querySelector('.culinary-info-box-body').innerHTML = `<ol>${s.howto.map(step => `<li>${step}</li>`).join('')}</ol>`;
}

function culGoTo(direction) {
    if (culAnimating) return;
    culAnimating = true;
    const nextIndex = (culCurrent + direction + culinaryData.length) % culinaryData.length;
    const els = [
        document.getElementById('cul-name'),
        document.getElementById('cul-desc1'),
        document.getElementById('cul-desc2'),
        document.getElementById('cul-label1'),
        document.getElementById('cul-list'),
        document.getElementById('cul-label2'),
        document.getElementById('cul-footer'),
    ];
    const imgEl = document.getElementById('cul-img');
    els.forEach((el, i) => {
        el.style.transition = `opacity 0.3s ease ${i*25}ms, transform 0.3s ease ${i*25}ms`;
        el.style.opacity    = '0';
        el.style.transform  = direction > 0 ? 'translateY(-18px)' : 'translateY(18px)';
    });
    imgEl.style.transition = 'opacity 0.35s ease, transform 0.4s ease';
    imgEl.style.opacity    = '0';
    imgEl.style.transform  = direction > 0 ? 'translateX(50px)' : 'translateX(-50px)';
    setTimeout(() => {
        culCurrent = nextIndex;
        culRender(culCurrent);
        els.forEach(el => { el.style.transition = 'none'; el.style.transform = direction > 0 ? 'translateY(18px)' : 'translateY(-18px)'; });
        imgEl.style.transition = 'none';
        imgEl.style.transform  = direction > 0 ? 'translateX(-50px)' : 'translateX(50px)';
        document.querySelector('.culinary-card-red').offsetHeight;
        setTimeout(() => {
            els.forEach((el, i) => { el.style.transition = `opacity 0.4s ease ${i*35}ms, transform 0.4s ease ${i*35}ms`; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
            imgEl.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
            imgEl.style.opacity    = '1';
            imgEl.style.transform  = 'translateX(0)';
            setTimeout(() => { culAnimating = false; }, 500);
        }, 30);
    }, 370);
}

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    culRender(0);
    document.querySelector('.culinary-card-nav button[aria-label="Previous"]').addEventListener('click', () => culGoTo(-1));
    document.querySelector('.culinary-card-nav button[aria-label="Next"]').addEventListener('click', () => culGoTo(1));
});
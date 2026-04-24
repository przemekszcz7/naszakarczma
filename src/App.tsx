/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Star, 
  ChefHat, 
  Utensils, 
  Table, 
  Car, 
  ExternalLink,
  ChevronRight,
  Fish,
  UtensilsCrossed
} from 'lucide-react';
import { useState } from 'react';

const MENU_DATA = {
  "Nasze specjalności": [
    { name: "Kotlet schabowy po chłopsku", desc: "smażony z boczkiem, podany z ziemniakami z patelni i zasmażaną kapustą (alergeny: 1,3,7)", size: "200g/150g/150g", price: "42.00" },
    { name: "Karczek w ziołach z grilla", desc: "z ziemniaczkami pieczonymi i sałatką grecką (alergeny: 1,3,7)", size: "200g/150g/150g", price: "44.00" },
    { name: "Placek po węgiersku", desc: "placki ziemniaczane z wołowym gulaszem węgierskim i bukietem surówek (alergeny: 1,3,7)", size: "200g/250g/150g", price: "45.00" },
    { name: "Gyros", desc: "drobiowy, z frytkami, sałatką grecką i sosem tzatziki (alergeny: 1,3,7)", size: "170g/150g/200g", price: "42.00" },
  ],
  "Tradycyjne": [
    { name: "Placki ziemniaczane", desc: "z kwaśną śmietaną (alergeny: 1,3,7)", size: "3 sztuki", price: "24.00" },
    { name: "Placki z sosem grzybowym", desc: "ziemniaczane (alergeny: 1,3,7)", size: "3 sztuki", price: "32.00" },
    { name: "Kotlet schabowy / Pierś panierowana", desc: "(alergeny: 1,3,7)", size: "150g", price: "18.00" },
    { name: "Kotlet schabowy / Pierś panierowana zapiekane", desc: "z serem i pieczarkami (alergeny: 1,3,7)", size: "250g", price: "25.00" },
    { name: "Grillowana pierś z kurczaka zapiekana", desc: "z pomidorami, serem typu feta i bazyliowym pesto (alergeny: 1,3,7)", size: "200g", price: "25.00" },
    { name: "Nugetsy", desc: "panierowane polędwiczki z kurczaka (alergeny: 1,3)", size: "150g", price: "18.00" },
  ],
  "Ryby smażone": [
    { name: "Karp 'dzwonko'", desc: "smażone (alergeny: 1,4)", size: "100g/wg wagi", price: "15.00" },
    { name: "Karp filet", desc: "(alergeny: 1,4)", size: "100g/wg wagi", price: "16.00" },
    { name: "Sandacz filet", desc: "(alergeny: 1,4,7)", size: "100g/wg wagi", price: "16.00" },
    { name: "Dorsz filet", desc: "(alergeny: 1,4,7)", size: "100g/wg wagi", price: "16.00" },
    { name: "Pstrąg z masełkiem ziołowym", desc: "(alergeny: 1,4,7)", size: "1 szt ok. 250g", price: "38.00" },
  ],
  "Zupy": [
    { name: "Zupa Dnia", desc: "(alergeny: 1,3,4,6,7,9)", size: "300 ml", price: "10.00" },
    { name: "Barszcz czysty", desc: "(alergeny: 1,9)", size: "250 ml", price: "9.00" },
    { name: "Barszcz z kołdunami", desc: "(alergeny: 4,6,9)", size: "350 ml", price: "17.00" },
    { name: "Flaki", desc: "(alergeny: 6,9)", size: "350 ml", price: "20.00" },
    { name: "Zupa gulaszowa wołowiną", desc: "(alergeny: 4,6,9)", size: "350 ml", price: "20.00" },
    { name: "Zupa rybna z karpia", desc: "(alergeny: 6,9)", size: "350 ml", price: "25.00" },
  ],
  "Pierogi": [
    { name: "Pierogi ruskie", desc: "z okrasą i śmietaną", size: "6 szt.", price: "20.00" },
    { name: "Pierogi ze szpinakiem", desc: "pod serową pierzynką z masełkiem i bułką tartą oraz z sosem koperkowo-czosnkowym", size: "6 szt.", price: "27.00" },
    { name: "Pierogi z mięsem", desc: "z okrasą i sosem czosnkowym", size: "6 szt.", price: "27.00" },
    { name: "Micha Karczmarza", desc: "mix pierogów (alergeny: 1,3,7)", size: "9 szt.", price: "35.00" },
  ],
  "Burger i przekąski": [
    { name: "Burger z szarpaniną i frytkami", desc: "szarpana wieprzowina, ogórek konserwowy, pomidor, cebula, sałata rzymska, sos majonezowy (alergeny: 1,3,7)", size: "300g", price: "35.00" },
    { name: "Ziemniaczki pieczone", desc: "z sosami jogurtowo-koperkowym i zielonym winegret (alergeny: 1,3,7)", size: "250g", price: "20.00" },
  ],
  "Desery": [
    { name: "Lody z gorącymi malinami", desc: "waniliowe (alergeny: 1,7)", size: "3 gałki", price: "18.00" },
    { name: "Naleśniki", desc: "z białym serem, sosem malinowym i bitą śmietaną (alergeny: 1,7)", size: "2 sztuki", price: "20.00" },
    { name: "Deser Dnia", desc: "ciasto domowe lub deser wystawione w witrynie", size: "160g", price: "17.00" },
  ],
  "Alkohole": [
    { name: "Wódka biała", desc: "czysta", size: "50 ml", price: "8.00" },
    { name: "Tequila z cytryną", desc: "Srebrna / Złota", size: "50 ml", price: "15.00" },
    { name: "Whisky Jack Daniel's", desc: "Tennessee Whiskey", size: "50 ml", price: "15.00" },
    { name: "Wino regionalne ANNA", desc: "białe lub czerwone (lampka)", size: "150 ml", price: "14.00" },
  ],
  "Piwa": [
    { name: "Piwo milickie", desc: "regionalne kraftowe", size: "0,5 l", price: "15.00" },
    { name: "Piwo beczkowe ŻYWIEC (duże)", desc: "lane", size: "0,5 l", price: "12.00" },
    { name: "Piwo beczkowe ŻYWIEC (małe)", desc: "lane", size: "0,3 l", price: "10.00" },
    { name: "Piwo butelkowe", desc: "Żywiec, Lech, Tyskie", size: "0,5 l", price: "12.00" },
    { name: "Piwo bezalkoholowe", desc: "warianty 0%", size: "0,5 l", price: "12.00" },
  ],
  "Cocktaile": [
    { name: "Aperol", desc: "Aperol, prosecco, woda gaz., pomarańcze, lód", size: "200 ml", price: "28.00" },
    { name: "Mohito", desc: "Rum Bacardi, limonka, mięta, cukier, woda gaz., lód", size: "200 ml", price: "28.00" },
    { name: "Pornstar Martini", desc: "Wódka, puree marakuja, syrop waniliowy, sok z cytryny", size: "200 ml", price: "28.00" },
    { name: "Whisky Sour", desc: "niezwykle kremowy: Whisky, sok z cytryny, białko, syrop cukrowy, angostura, lód", size: "150 ml", price: "28.00" },
    { name: "Old Fashioned", desc: "Whisky, syrop cukrowy, angostura, lód", size: "100 ml", price: "28.00" },
    { name: "Berry Lime", desc: "Gin, 1883 jeżyna, prosecco, kwiat bzu, limonka, mięta, woda gaz., lód", size: "200 ml", price: "28.00" },
    { name: "Mohito Yuzu 0%", desc: "syrop Yuzu, limonka, mięta, cukier, woda gaz., lód", size: "200 ml", price: "22.00" },
  ]
};

const PHOTOS = [
  "https://scontent-waw2-2.xx.fbcdn.net/v/t51.82787-15/670952023_17992892312948091_8718819319224834915_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=ThrqFchnrJEQ7kNvwGW5VSE&_nc_oc=AdoFnpfE6sIeGCMMvdJdXmr81iHJpZASKO2KigrcDkvU9jHBfXIvnLrRaOe_y3_vrfU&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=By4ZlIVD4l8Dmrs7XxXcng&oh=00_Af1KTnNhOjQCG6LqnAezRKH0JE3dKLf3rp_8W9TxGbttpw&oe=69F0DEEC",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t51.82787-15/670886170_17992892336948091_6280598510410236925_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=K9mlOK6xM4sQ7kNvwHec9Pd&_nc_oc=AdpJQISdqWFqTD8eKE5SC8OjygL083Z14rGZFX21PAWIfq1AituyMnFIbMuNvpJImUY&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=Kepc_TbXu505H3JOvGb1ZQ&oh=00_Af1z5zNU_wlAvIf6Zhj2RZSvQ0ucrWchhc1OW5PnPRpG7w&oe=69F0D9A0",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t51.82787-15/669544545_17992067972948091_6145681781996285628_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=iO8A2f7SlP0Q7kNvwHiNplr&_nc_oc=AdoOIxF2c-SjsrpDwoWOLtI4so5pEgr_veI61T1LgZj-icV7a9VJqmyUiVRda5d8QJo&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=Nz10NJ1hrGqWgGyoqcwkiQ&oh=00_Af3Xc7wFIvaTOeG3R6SSQlyIIkiKy08xG-5DxDT5ZBSj1w&oe=69F0E17D",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/647684561_1680472580245086_1532743783820094339_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=b895b5&_nc_ohc=61G-gpcSP2QQ7kNvwGAiAQw&_nc_oc=AdqIAoRIOwBLqKkm4pmxpovBawaKa9XHxMVHjhQ70HlVjBHM1B9dcNB7YH6wIgV4uQA&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=5biM9f3uIV0gCL7wy-14-A&oh=00_Af2HbQkeCe4I9ygt09oP7hqJYkJSRG3hl298eQ1HMdCl6Q&oe=69F0EB72",
  "https://lh3.googleusercontent.com/geougc-cs/AMG9lERvnAJWXUAMg7goWLg3DyFINi-43eTeRcOjeNIyBKaS_9vazOOkTVg__AxDNRAPMSaj3Hkm8Em8QgUln_FCxGrNgcG-KeyhUspbA3Rh75ACcn1uobJ99tzkBG9pLmlYfBNHY0K_nDk-4rNy=w300-h450-p",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t51.82787-15/649224070_17987420708948091_583721640206258828_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=nM9EPq4jkBkQ7kNvwHTVZEI&_nc_oc=AdosbCP883T5CIOfBRDbi6qyqmmRsuJyDQ49Ut41ursG5nlRHAFhNkee7gJRBg_Uwb8&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=_i2vadvp33d_ZchsChEqpQ&oh=00_Af06Ec-3hMgjrRzLOv_f-UprgdWnJxA99yE1qPGeDLKTvg&oe=69F0E7A7"
];

const NewsAlert = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-karczma-paper p-6 rounded-2xl border-l-4 border-karczma-accent shadow-sm flex flex-col gap-2"
  >
    <div className="flex items-center gap-2 text-karczma-accent">
      <ChefHat size={18} className="animate-pulse" />
      <h3 className="text-xs font-sans font-black uppercase tracking-[0.2em]">Aktualności</h3>
    </div>
    <p className="text-xl font-serif font-black italic leading-tight text-karczma-dark">"Kucharz lub Kucharka poszukiwani"</p>
    <p className="text-sm opacity-80 leading-relaxed">Zapraszamy osobiście lub telefonicznie do dołączenia do naszego zespołu.</p>
    <div className="mt-2 flex items-center gap-2">
      <div className="p-2 bg-karczma-accent rounded-lg text-white">
        <Phone size={16} />
      </div>
      <a href="tel:+48501210375" className="text-lg font-sans font-black tracking-tight hover:underline">
        501 210 375
      </a>
    </div>
  </motion.div>
);

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(Object.keys(MENU_DATA)[0]);

  return (
    <section id="menu" className="bg-white shadow-sm border border-karczma-dark/10 p-6 flex flex-col rounded-xl md:h-full">
      <div className="flex justify-between items-end mb-6 border-b-2 border-karczma-dark pb-3">
        <h2 className="text-4xl font-serif font-black italic leading-none tracking-tight">Menu Karczmy</h2>
        <span className="text-[10px] font-sans uppercase font-black opacity-30 tracking-[0.2em] hidden sm:block">Ceny w PLN</span>
      </div>

      <div className="flex overflow-x-auto gap-2 mb-8 no-scrollbar pb-2">
        {Object.keys(MENU_DATA).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded text-[10px] uppercase font-black tracking-widest transition-all ${
              activeCategory === cat 
                ? 'bg-karczma-dark text-white' 
                : 'bg-karczma-paper text-karczma-dark hover:bg-karczma-gold/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-6">
        <div className="grid gap-x-12 gap-y-6">
          {MENU_DATA[activeCategory as keyof typeof MENU_DATA].map((item, idx) => (
            <motion.div
              key={item.name + idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className="group"
            >
              <div className="flex justify-between items-end gap-4 mb-1">
                <h3 className="text-sm font-serif font-black tracking-tight group-hover:text-karczma-accent transition-colors">{item.name}</h3>
                <div className="flex-1 border-b border-dotted border-karczma-dark/20 mb-1"></div>
                <span className="text-sm font-sans font-black text-karczma-accent">{item.price}</span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase font-sans tracking-wider">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
        <p className="text-[10px] uppercase font-sans font-black tracking-[0.2em] text-center opacity-40">
           Obiad Dnia od pon do pt • Alergeny: 1,3,4,6,7,9
        </p>
      </div>
    </section>
  );
};

export default function App() {
  const [activeMenuCategory, setActiveMenuCategory] = useState(Object.keys(MENU_DATA)[0]);

  return (
    <div className="min-h-screen bg-karczma-beige selection:bg-karczma-gold selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-karczma-beige/90 backdrop-blur-md border-b border-karczma-dark/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-serif font-black tracking-tighter uppercase text-karczma-dark">Nasza Karczma</h1>
          </div>
          <div className="hidden lg:flex gap-10">
            {['Start', 'Aktualności', 'Menu', 'Galeria', 'Kontakt'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-[10px] font-sans font-black uppercase tracking-[0.2em] hover:text-karczma-accent transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="start" className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden bg-karczma-dark">
        <div className="absolute inset-0 opacity-40">
          <img src={PHOTOS[1]} alt="Tło" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[12px] uppercase tracking-[0.4em] font-sans font-black mb-4 opacity-70">Tradycyjna Kuchnia Polska • Milicz</p>
            <h2 className="text-6xl md:text-9xl font-serif font-black tracking-tighter uppercase leading-none mb-8">Nasza<br/>Karczma</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#menu" className="bg-karczma-gold text-karczma-dark px-10 py-4 font-sans font-black uppercase tracking-widest text-xs hover:bg-white transition-colors">Karta Menu</a>
              <a href="#kontakt" className="border-2 border-white text-white px-10 py-4 font-sans font-black uppercase tracking-widest text-xs hover:bg-white hover:text-karczma-dark transition-all">Gdzie jesteśmy</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-karczma-paper py-10 border-b border-karczma-dark/5"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex items-center justify-center gap-4 text-karczma-dark/60 uppercase font-sans font-black tracking-widest text-[10px]">
             <Table size={20} className="text-karczma-accent" /> Stoliki na zewnątrz
          </div>
          <div className="flex items-center justify-center gap-4 text-karczma-dark/60 uppercase font-sans font-black tracking-widest text-[10px]">
             <Utensils size={20} className="text-karczma-accent" /> Jedzenie na miejscu
          </div>
          <div className="flex items-center justify-center gap-4 text-karczma-dark/60 uppercase font-sans font-black tracking-widest text-[10px]">
             <Car size={20} className="text-karczma-accent" /> Odbiór na ulicy
          </div>
        </div>
      </motion.div>

      {/* News Section */}
      <section id="aktualności" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-auto md:h-[600px] bg-gray-200"
            >
              <motion.img 
                src={PHOTOS[2]} 
                alt="Praca" 
                initial={{ filter: "grayscale(100%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full object-cover transform-gpu backface-hidden" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-center gap-3 text-karczma-accent mb-6">
                <ChefHat size={24} className="animate-pulse" />
                <h3 className="text-xs font-sans font-black uppercase tracking-[0.3em]">Ogłoszenie</h3>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-black italic text-karczma-dark mb-8 leading-tight">
                Szukamy Pasjonatów<br/><span className="text-karczma-accent">Gotowania!</span>
              </h2>
              <div className="bg-karczma-paper p-8 rounded-2xl border-l-8 border-karczma-accent mb-10">
                <p className="text-2xl font-serif font-black italic mb-4">Kucharz lub Kucharka poszukiwani</p>
                <p className="text-lg opacity-70 leading-relaxed mb-6">
                  Dołącz do naszego zespołu w Miliczu. Jeśli kochasz polską kuchnię tak samo jak my, zapraszamy Cię do kontaktu telefonicznego lub osobistego.
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-karczma-dark text-white p-4 rounded-xl shadow-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-sans font-black uppercase tracking-widest opacity-40">Zadzwoń bezpośrednio</p>
                    <a href="tel:+48501210375" className="text-2xl font-sans font-black tracking-tighter hover:text-karczma-accent transition-colors">501 210 375</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 bg-karczma-beige overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-black italic mb-4">Nasza Karta</h2>
            <p className="text-xs font-sans font-black uppercase tracking-[0.4em] opacity-30">Smak tradycji w każdym kęsie</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-3xl shadow-2xl border border-karczma-dark/5 overflow-hidden"
          >
            <div className="flex overflow-x-auto bg-karczma-dark p-2 gap-2 no-scrollbar">
              {Object.keys(MENU_DATA).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveMenuCategory(cat)}
                  className={`whitespace-nowrap px-8 py-3 rounded-xl text-[10px] font-sans font-black uppercase tracking-widest transition-all ${
                    activeMenuCategory === cat 
                      ? 'bg-karczma-gold text-karczma-dark' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-16">
              <div className="grid md:grid-cols-1 gap-x-20 gap-y-12">
                <motion.div
                  key={activeMenuCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  {MENU_DATA[activeMenuCategory as keyof typeof MENU_DATA].map((item, idx) => (
                    <div key={item.name + idx} className="group cursor-default">
                      <div className="flex justify-between items-end gap-2 md:gap-4 mb-2">
                        <h4 className="text-lg md:text-2xl font-serif font-black tracking-tight group-hover:text-karczma-accent transition-colors leading-tight">{item.name}</h4>
                        <div className="flex-1 border-b border-dotted border-karczma-dark/20 mb-2"></div>
                        <span className="text-lg md:text-2xl font-sans font-black text-karczma-accent whitespace-nowrap">{item.price} zł</span>
                      </div>
                      <div className="flex justify-between items-start md:items-center text-[10px] md:text-[11px] uppercase font-sans font-black tracking-[0.1em] md:tracking-[0.2em] opacity-40 gap-4">
                        <p className="flex-1">{item.desc}</p>
                        <p className="whitespace-nowrap">{item.size}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              <div className="mt-16 pt-10 border-t border-dashed border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[10px] uppercase font-sans font-black tracking-[0.2em] opacity-40 italic">
                  <p>• Obiad Dnia (zupa + II danie + kompot) serwujemy od pon do pt</p>
                  <p className="md:text-right">• Alergeny: 1,3,4,6,7,9 • Do zup podajemy pieczywo regionalne</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="pt-24 pb-32 px-6 bg-karczma-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative z-10">
            <div className="text-left">
              <h2 className="text-5xl md:text-7xl font-serif font-black italic mb-4">Galeria</h2>
              <p className="text-[10px] font-sans font-black uppercase tracking-[0.4em] opacity-40">Zobacz naszą pasję do jedzenia</p>
            </div>
            <a href="https://www.facebook.com/naszakarczmamilicz" target="_blank" className="flex items-center gap-2 group text-xs font-sans font-black tracking-widest uppercase mb-2 hover:text-karczma-accent transition-colors">
              Więcej na Facebook <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[PHOTOS[3], PHOTOS[4], PHOTOS[0], PHOTOS[5]].map((photo, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-3xl group aspect-square shadow-xl relative"
              >
                <img 
                  src={photo} 
                  alt={`Galeria ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 transform-gpu backface-hidden will-change-transform" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="kontakt" className="pt-32 pb-24 px-6 bg-karczma-paper">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <h2 className="text-5xl md:text-7xl font-serif font-black italic mb-12 text-karczma-dark">Zapraszamy!</h2>
              
              <div className="space-y-12">
                <div className="flex gap-8">
                  <div className="bg-karczma-dark text-white p-4 rounded-2xl h-fit shadow-xl">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-black uppercase tracking-widest opacity-40 mb-2">Adres</h4>
                    <p className="text-2xl font-serif font-black text-karczma-dark">ul. Mickiewicza 16<br/>56-300 Milicz</p>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="bg-karczma-dark text-white p-4 rounded-2xl h-fit shadow-xl">
                    <Clock size={32} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-sans font-black uppercase tracking-widest opacity-40 mb-2">Godziny Otwarcia</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 text-sm font-sans font-black tracking-tight text-karczma-dark">
                      {['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'].map((day) => (
                        <div key={day} className="flex justify-between py-1 border-b border-karczma-dark/5">
                          <span className="capitalize">{day[0]+day[1]+day[2]+'.'}</span>
                          <span>12:00-21:00</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href="tel:+48509840193" className="flex-1 bg-karczma-accent text-white py-6 rounded-2xl flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform shadow-2xl">
                    <Phone size={24} />
                    <span className="text-xs font-sans font-black uppercase tracking-widest">Zadzwoń</span>
                  </a>
                  <a href="https://maps.app.goo.gl/kRFftg9wbtyVFw2D9" target="_blank" className="flex-1 bg-white text-karczma-dark py-6 rounded-2xl flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform shadow-2xl border border-karczma-dark/5">
                    <Star size={24} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-sans font-black uppercase tracking-widest">Opinie</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-7 h-[600px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white relative group"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.450698486436!2d17.267588712835618!3d51.523292871699496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47055bf19231f8a1%3A0x1a1dba91b2e09cdd!2sAdama%20Mickiewicza%2016%2C%2056-300%20Milicz!5e0!3m2!1spl!2spl!4v1777016165937!5m2!1spl!2spl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                className="grayscale group-hover:grayscale-0 transition-all duration-1000"
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 bg-karczma-dark text-white p-6 rounded-2xl shadow-2xl flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-black italic">Nasza Karczma</h3>
                  <p className="text-[10px] font-sans font-black uppercase tracking-widest opacity-40">ul. Mickiewicza 16, Milicz</p>
                </div>
                <a href="https://www.google.com/maps/dir/?api=1&destination=Adama+Mickiewicza+16+Milicz" target="_blank" className="bg-karczma-gold text-karczma-dark px-6 py-2 rounded-lg text-xs font-sans font-black tracking-widest uppercase">Prowadź</a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-karczma-dark text-white py-20 px-6 border-t border-karczma-accent/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-serif font-black tracking-tighter uppercase mb-4">Nasza Karczma</h1>
            <p className="text-xs font-sans font-black uppercase tracking-[0.3em] opacity-30">Prawdziwy smak domowych obiadow</p>
          </div>
          
          <div className="flex gap-6">
            <a href="https://www.facebook.com/naszakarczmamilicz" target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-karczma-accent transition-colors">
              <Facebook size={32} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] font-sans font-black uppercase tracking-[0.4em] opacity-30 mb-2">Zapraszamy serdecznie</p>
            <p className="text-xs opacity-60">© {new Date().getFullYear()} Nasza Karczma Milicz. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

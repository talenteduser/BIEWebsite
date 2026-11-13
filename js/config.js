/* ===== EDIT ME: every text, image, model and person on the site lives here ===== */
window.SITE = {
  name: "Skibidian Border & Immigration Enforcement",
  logo: "assets/icons/logo.png",                       // optional, hidden if missing
  banner: "WE ARE RECRUITING!",
  footer: "2026 Goverment of Skibidia, all rights reserved",
  nav: [["Mission", "#/page/mission"], ["Most Wanted", "#/wanted"]],

  loader: {
    title: "SKIBIDIAN SECURE PORTAL",
    model: "assets/models/skibidianLogo.glb",                       
    minMs: 5000,                     // how long the fake loading lasts
    tips: ["Raping niggers with pickaxes...", "Sending the 'zas...",
           "Loading rape hydraulics...", "Syncing tuff spy satellites...", "Calibrating opsec levels..."]
  },

  // img = your picture (missing file falls back to color). link = any #/page/<key> or #/wanted
  slides: [
    { title: "Most Wanted", text: "Help us find the fugitives on our global watchlist.", img: "assets/slides/slide1.jpg",
      color: "linear-gradient(135deg,#0a1f44,#6b1020)", link: "#/wanted" },
    { title: "Our Mission", text: "Securing the borders of Skibidia since um, I dont remember, oops.", img: "assets/slides/slide2.jpg",
      color: "linear-gradient(135deg,#0a1f44,#1d5c8a)", link: "#/page/mission" },
  ],

  // Subpages: add as many as you want and link them with #/page/<key>. body accepts HTML.
  pages: 
    {
      mission: 
      { 
        title: "Our Mission", 
        file: "pages/mission.html"
      },
  },

  socials: [   // icon = your svg/png path; if missing, the name is shown instead
    { name: "X", url: "https://x.com/talented_user", icon: "assets/icons/xitter.svg" },
    { name: "YouTube", url: "https://www.youtube.com/atalentedyoutubeuser", icon: "assets/icons/youtube.svg" },
  ],

  // World map data. Default is a CDN file; for offline hosting save it into data/ and change the path.
  map: { topo: "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json" },

  wanted: [   // lat/lon place the pin. icon/photo = optional image paths. opsec 0-100 (100 = very hard to catch)
    { name: "Jose Alberto Mairena Matute", alias: "PHROGG-06/JERON/GDPLEX", lat: 14, lon: -88, opsec: 65,
      icon: "assets/wanted/pin1.jpg", photo: "assets/wanted/1.jpg",
      info: { Age: "19 years", Status: "RAPED", "Last seen": "Honduras, Universidad Tecnologica Centroamericana"},
      charges: ["Uvula fetish", "Possession of 'p", "Furfaggotry Class 5", "Goonerism class 5"],
      bio: "What does the average Hondurian like Phrogg do when they get unlimited access to the white man's invention? Learn a new skill maybe? Actually, it's more like consuming porn to the point of addiction and breaking your penis in half. Trying to moral fag while being from a shithole nobody cares about, screenshot everything that leaks your clitty so you can report it to the feds or something, debate people while being a genuine retard who sometimes forgets how to breath, do all of this, every, single, day, for 4 years straight, have no self awareness and say your enemies do all of the above, Truly these grandiose people deserve access to the white men net!" 
    },

    { name: "Antonio Zambrano", alias: "ant030907/@AntTheAnimator", lat: 28, lon: -80, opsec: 52,
      icon: "assets/wanted/pin2.jpg", photo: "assets/wanted/ant.jpg",
      info: { Age: "19 Years", Status: "AT LARGE", "Last seen": "Florida"},
      charges: ["Production of illecit furry porn", "Furfaggotry Class 3", "Goonerism class 3", "Larping as anti-furry"],
      bio: "Ant is a larpy christian latinx furry (((ARTIST))) who makes boring videos on the 'tube that is not funny, not entertaining, where he shares way too much embarasing shit about himself and talks about shit nobody cares about, he was an anti furry but got pantied and sissified by furry porn and now serves the dog cock. The art he produces is 80% softcore porn about his furry OC lucy who he litterally admits is based on a pornographic image he gooned to when he was a caca addicted to porn (he still is btw)." 
    },
    { name: "CEO of trolling", alias: "@The_TrollVision/CEO of trolling", lat: 52, lon: 20, opsec: 88,
      icon: "assets/wanted/pin3.jpg", photo: "assets/wanted/trollvision.jpg",
      info: { Age: "Unc", Status: "AT LARGE", "Last seen": "Buying a femboy outfit under a bridge in the town of szcyzjkjchzywojewksc"},
      charges: ["Femboyism class 2", "ESL penalty", "gay fail larp"],
      bio: "Polish anti-furry who got raped and sissified by an unknown assilant who used a sort of hydraulic machine, is now addicted to crack, is depressed, and lives under a bridge, also uses mulvad VPN behind 17 proxies or something to avoid getting 'oxed because hes a paranoid freak." 
    },
    { name: "Bushnell", alias: "@killerbushnell", lat: 30, lon: 70, opsec: 70,
      icon: "assets/wanted/pin4.jpg", photo: "assets/wanted/bushnel.jpg",
      info: { Age: "probably over 30", Status: "AT LARGE", "Last seen": "Touching a goat", "Relations": "Gay relationship w CEO of trolling"},
      charges: ["ESL penalty", "Acts of Zoophilia", "Acts of animal rape", "Acts of child rape"],
      bio: "Bushnel is a Paki goat-fucking pedophile-worshipping dysgenic sub-5 nigcel with 100 thousand children as subscribers (more commonly known as sex workers in this context) his favorite activities includes shitting on indians (Even doe they are the same genetically), and using the village computer to goon on der cord." 
    },
    { name: "Asher J. McRae", alias: "Crimsonfur/PvZPlayer369", lat: -37.75481806, lon: 144.9979198, opsec: 2,
      icon: "assets/wanted/pin5.jpg", photo: "assets/wanted/crimson.jpg",
      info: { Age: "17 Years", Status: "DOXED & RAPED", "Last seen": "Allegedly sighted at a showing of The Amazing Digital Circus shouting about yuri"},
      charges: ["Acts of Zoophilia", "Acts of plush rape", "Acts of groomings","Furfaggotry Class 4", "Goonerism class 4"],
      bio: "Besides being a faggot, Crimson is known for being a PvZ sperg and often having many clashes with antifurry chuds and other furfags that dont like xim on der 'tube. This would cause a random ESL russian called Anton to dox him with the help of soyteens." 
    },
  ]
};




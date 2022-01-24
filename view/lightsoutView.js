class LampaView {
  constructor(kontener, sorIndex, oszlopIndex) {
    kontener.append('<div class="lampa"></div>'); //a lámpa div hozzáadása a konténerhez
    this.LampaElem = kontener.children("div:last"); //az aktuálisan létrejövő obj. a konténerben lévő jelenleg legutolsó div
    this.vilagit = false; //alapjáraton ne világítson, mikor létrejön az obj.
    this.sorIndex = sorIndex;
    this.oszlopIndex = oszlopIndex;
    this.type="lampa";

    //a lámpa kattintáseseménye
    this.LampaElem.on("click", () => {     
      this.esemenyInfoAtadas("kattintas");
    });
  }

  setAllapot() {
    if (this.vilagit) {
      this.leKapcsol();
    } else {
      this.felKapcsol();
    }
  }

  felKapcsol() {
    this.LampaElem.css("background-color", "yellow");
    this.vilagit = true;
  }

  leKapcsol() {
    this.LampaElem.css("background-color", "lightgreen");
    this.vilagit = false;
  }

  esemenyInfoAtadas(esemenynev) {
    let esemeny = new CustomEvent(esemenynev, { detail: this });
    window.dispatchEvent(esemeny);
  }

  getOszlopIndex() {
    return this.oszlopIndex;
  }

  getSorIndex() {
    return this.sorIndex;
  }
}

class JatekterView {
  constructor(lampaObjektumTomb) {
    const kontener = $("article");
    this.meret = 5;
    for (let i = 0; i < this.meret; i++) {
      lampaObjektumTomb.push({ segedTomb: [] }); //"2 dimenzióssá" teszem egy segédaltömb hozzáadásával
      for (let j = 0; j < this.meret; j++) {
        lampaObjektumTomb[i].segedTomb.push(new LampaView(kontener, i, j)); //így fogok majd tudni hivatkozni indexpáros alapján egy lámpaobjektumra: lampaObjektumTomb[i].segedTomb[j]
      }
    }
  }
}

class InfoView {
  constructor() {
    this.feladomGomb = $("#feladom");
    this.felbukkanoAblak = $("<div class='felbukkano'><p></p><input type='button' value='OK' id='OK'></div>");
    this.OKGomb = this.felbukkanoAblak.children("#OK");
    this.pElem = this.felbukkanoAblak.children("p");
    this.relativeElem = $("body"); //ehhez appendeli hozzá majd a felbukkanó ablakot (CSS --> position: relative/absolute)
    this.relativeElem.append(this.felbukkanoAblak);
    this.eltuntetFelbukkanoAblak();

    this.feladomGomb.on("click", () => { //uzenek LOControllernek
      this.esemenyInfoAtadas("kattintas");      
    });

    this.OKGomb.on("click", () => { //uzenek LOControllernek
      this.esemenyInfoAtadas("ujjatek"); 
      this.eltuntetFelbukkanoAblak();        
    });
   
  }
  megjelenitFelbukkanoAblak() {
    this.felbukkanoAblak.show();
  }

  eltuntetFelbukkanoAblak() {
    this.felbukkanoAblak.hide();
  }

  esemenyInfoAtadas(esemenynev) {
    let esemeny = new CustomEvent(esemenynev, { detail: this });
    window.dispatchEvent(esemeny);
  }

  setJatekVege(szoveg) {
    //szoveg tartalmát írja be felbukkanoAblak-ba (kívülről lesz irányítva)
    this.pElem.text(szoveg);
  }
}

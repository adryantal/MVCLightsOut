class LOController {
  constructor() {
    const LOTomb = [];                             //az összes lámpaobjektum gyüjtőtömbje
    const LOJatekterView = new JatekterView(LOTomb); //játéktér generálása, vele együtt LOTomb feltöltése
    const meret = LOTomb.length;    
    const LODataModel = new LOModel(LOTomb);         
    const LOInfoView = new InfoView();
  

    $(window).on("ujjatek", () => { //sima function-nel nem működött, => fuggv. kellett!
      this.ujJatek();
      LOInfoView.eltuntetFelbukkanoAblak();
    });

    $(window).on("feladom", (event) => {      
      LOInfoView.megjelenitFelbukkanoAblak();
      LOInfoView.setJatekVege("Feladtad! Most új játék következik. (A világító lámpák száma: "+event.detail +")");      
    });

    /*FÜGGVÉNY: KATTINTÁSESEMÉNY ELKAPÁSA, A KÖRNYEZŐ LÁMPÁK ÁLLAPOTVÁLTOZÁSA*/
    $(window).on("kattintas", function (event) {
      if (event.detail.type == "lampa") { //ha a kattintáseseményt egy lámpa váltotta ki      

          //lekérem az eseményt kiváltó lámpaobjektum sor- ill. oszlopindexét
          const sorIndex = event.detail.sorIndex;
          const oszlopIndex = event.detail.oszlopIndex;
          //a kiváltó lámpaobj. állapota változzon meg 
          LODataModel.kapcsolLampaObj(sorIndex,oszlopIndex);  

          //console.log ("A kattintást kiváltó lámpa helye: ["+sorIndex+", "+oszlopIndex+"]");

          //szomszédok indexpárosai
          //const alsoIndexParos = [sorIndex+1,oszlopIndex];
          //const felsoIndexParos = [sorIndex-1,oszlopIndex];
          //const balIndexParos = [sorIndex,oszlopIndex-1];
          //const jobbIndexParos = [sorIndex,oszlopIndex+1];

          //indexvizsgálat + a szomszédos lámpák állapotának megváltoztatása:
          if (!(sorIndex + 1 > meret - 1)) {
            LODataModel.kapcsolLampaObj(sorIndex + 1,oszlopIndex);         
          }
          if (!(sorIndex - 1 < 0)) {
            LODataModel.kapcsolLampaObj(sorIndex - 1,oszlopIndex); 
          }
          if (!(oszlopIndex + 1 > meret - 1)) {
            LODataModel.kapcsolLampaObj(sorIndex,oszlopIndex + 1);  
          }
          if (!(oszlopIndex - 1 < 0)) {
            LODataModel.kapcsolLampaObj(sorIndex,oszlopIndex - 1);  
          }

          //világító lámpák számának vizsgálata; ha ez 0, akkor nyert a játékos
          if (LODataModel.szamolVilagitoLampak() == 0) {           
            LOInfoView.megjelenitFelbukkanoAblak();
            LOInfoView.setJatekVege( "Gratulálunk, nyertél!!! Most pedig új játék indul!");
          }
      } else { //ha a kattintáseseményt a Feladom gomb váltotta ki; ez azért kell, hogy a világító lámpák számát át tudjuk adni
            //this.ujJatek(); --> így nem működik!!!
          console.log("A kattintást nem a LampaView osztály egy példánya váltotta ki!");
          let vilagitoLampakSzama = LODataModel.szamolVilagitoLampak();      
          let esemeny = new CustomEvent("feladom", {
            detail: vilagitoLampakSzama,
          });
          window.dispatchEvent(esemeny);
      }
    });
  }

  /*FÜGGVÉNY: ÚJ JÁTÉK INDÍTÁSA*/
  ujJatek() { 
    let event = new Event("ujrainicializalas"); //uzenek a LOMOdel-nek, hogy ujra allitsa be a lampaobjektumokat kezdeti allapotba
    window.dispatchEvent(event);  
  }

  
  
}

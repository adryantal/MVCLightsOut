class LOModel {
  constructor(tomb) {
    this.tomb = tomb;
    this.kezdetiVilagitoIndexek = []; //a kezdetben világító lámpák indexpárosait tároló tömb
    this.generalKezdetiVilagitoIndex(); //kezdetben a tömb random elemein "felkapcsoljuk a fényt"


   /* */ 
    $(window).on("ujrainicializalas", () => {  //sima function-nel nem működött, => fuggv. kellett!
      //először be kell járni a 2 dimm. tömböt, és minden egyes elemén (lámpaobjektumon) le kell kapcsolni a fényt
      for (let i = 0; i < this.tomb.length; i++) {
        for (let j = 0; j < this.tomb.length; j++) {
          this.tomb[i].segedTomb[j].leKapcsol();
        }
      }
      this.uritKezdetiVilagitoIndexek(); //ürítem tömböt, hogy új indexpárosokkal tölthessem fel
      this.generalKezdetiVilagitoIndex(); //új indexpárosok véletlenszerű generálása
    });
  }

  kapcsolLampaObj(sorIndex, oszlopIndex) {
    this.tomb[sorIndex].segedTomb[oszlopIndex].setAllapot();
  }

  szamolVilagitoLampak() {
    let vilagitoLampak = 0;
    for (let i = 0; i < this.tomb.length; i++) {
      for (let j = 0; j < this.tomb.length; j++) {
        if (this.tomb[i].segedTomb[j].vilagit) {
          vilagitoLampak++;
        }
      }
    }
    return vilagitoLampak;
  }


 /* FÜGGVÉNY: A KEZDETI VILÁGÍTÓ INDEXEK TÖMB ÜRÍTÉSE (SETTER)*/
  uritKezdetiVilagitoIndexek() {
    this.kezdetiVilagitoIndexek.splice(0, this.kezdetiVilagitoIndexek.length);
  }

  /*FÜGGVÉNY: A KEZDETBEN VILÁGÍTÓ LÁMPAOBJEKTUMOK INDEXPÁROSAINAK VÉLETLENSZERŰ GENERÁLÁSA*/
  generalKezdetiVilagitoIndex() {
    const db = 5;
    //5db egymástól különböző indexpárost generál véletlenszerűen
    while (!(this.kezdetiVilagitoIndexek.length == db)) {
      //addig fusson, amíg a tömb hossza el nem éri az 5-öt
      let i = Math.floor(Math.random() * db); //0-5
      let j = Math.floor(Math.random() * db); //0-5

      if (this.kezdetiVilagitoIndexek.length == 0) {
        //ha még üres, tegyen bele egy indexpárt
        this.kezdetiVilagitoIndexek.push([i, j]);
      } else {
        //ha már nem üres a tömb, akkor tegyük bele az új indexpárt, FELTÉVE, HA még nincsen benne
        let beszur = false; //a beszur kapcsoló kezdetben hamis; csak akkor szúrható be az új indexpáros, ha igazzá válik
        let sz = 0;
        while (
          sz < this.kezdetiVilagitoIndexek.length &&
          !(
            this.kezdetiVilagitoIndexek[sz][0] == i &&
            this.kezdetiVilagitoIndexek[sz][1] == j
          )
        ) {
          //amíg nem ér a tömb végére és nem egyezik az akt.eleme az újonnnan generált indexpárossal
          if (sz == this.kezdetiVilagitoIndexek.length - 1) {
            //ha végigfutott a ciklus a tömb teljes hosszán, akkor nem található még meg benne az indexpáros, tehát be lehet szúrni
            beszur = true;
          }
          sz++;
        }
        if (beszur) {
          //ha igaz, hogy nincsen benne, akkor szúrjuk be
          this.kezdetiVilagitoIndexek.push([i, j]);
        }
      }
    }
    console.log(this.kezdetiVilagitoIndexek);
    this.kezdetiVilagitoElemek(this.tomb);
  }

  /* FÜGGVÉNY: KEZDETBEN A FENTEBB MEGHATÁROZOTT INDEXŰ ELEMEK LEGYENEK KIVILÁGÍTVA*/
  kezdetiVilagitoElemek() {
    this.kezdetiVilagitoIndexek.forEach((indexparos) => {
      let i = indexparos[0];
      let j = indexparos[1];
      console.log(i, j);
      this.tomb[i].segedTomb[j].setAllapot();
    });
  }
}

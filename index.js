const { fifaData } = require('./fifa.js')

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const dunyakupasi2014Final = fifaData.filter(val => val.Year == 2014 && val.Stage == "Final");

console.log(dunyakupasi2014Final.map(val => val["Home Team Name"]));

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

console.log(dunyakupasi2014Final.map(val => val["Away Team Name"]));

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

console.log(dunyakupasi2014Final.map(val => val["Home Team Goals"]));

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

console.log(dunyakupasi2014Final.map(val => val["Away Team Goals"]));

//(e) 2014 Dünya kupası finali kazananı*/

console.log(dunyakupasi2014Final.map(val => val[`Win conditions`]));


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(dizi) {

	const dunyakupasiFinal = dizi.filter(val => val.Stage == "Final");
	
	return dunyakupasiFinal
}

console.log("Görev 2 - Finaller ", Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(dizi, callback) {
	
    const gericagirim = callback(dizi)
	const sadeceYillar = gericagirim.map(val => val.Year)

	return sadeceYillar
}
console.log(Yillar(fifaData,Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(dizi, callback) {
	const fonksiyonum = callback(dizi)
	const kazanan = fonksiyonum.map(val => {
		if (val["Home Team Goals"] > val["Away Team Goals"]) {
		  return val["Home Team Name"];
		} else if (val["Home Team Goals"] < val["Away Team Goals"]) {
		  return val["Away Team Name"];
		} else {
		  return "Beraberlik";
		}
	  });

return kazanan;

}
console.log(Kazananlar(fifaData,Finaller));



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/
function YillaraGoreKazananlar(
	data,
	FinallerCallback,
	YillarCallback,
	KazananlarCallback
  ) {
	const finalsList = FinallerCallback(data); // Finaller(prop)
	console.log(finalsList.length);
	const yearsList = YillarCallback(finalsList, FinallerCallback); // function Yillar(allData, getFinalStages) {
	console.log(yearsList.length);
	const winnersList = KazananlarCallback(finalsList, FinallerCallback); // Kazananlar
	console.log(winnersList.length);
  
	const result = yearsList.map((year, index) => {
	  return `${year} yılında, ${winnersList[index]} dünya kupasını kazandı!`;
	});
	return result;
  }
  console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(callback) {
	const macBasiGol = callback.map((val) => ({
	  golSayisi: val["Home Team Goals"] + val["Away Team Goals"],
	}));
  
	console.log(macBasiGol);
  
	const ToplamGol = macBasiGol.reduce((toplam, val) => {
	  return toplam + val.golSayisi;
	}, 0);
	console.log(ToplamGol);
  
	return (ToplamGol / macBasiGol.length).toFixed(2);
  }
  
  console.log(OrtalamaGolSayisi(Finaller(fifaData)));



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data, initial) {
	let finalTakimlarList = Kazananlar(fifaData, Finaller).slice();
	let finalTakimlarKazanmaSayilari = {};
	let initialList = {};
	let returnListe = {};
	let result = {};
  
	for (let i = 0; i < finalTakimlarList.length; i++) {
	  if (finalTakimlarList[i] in finalTakimlarKazanmaSayilari) {
		finalTakimlarKazanmaSayilari[finalTakimlarList[i]] += 1;
	  } else {
		finalTakimlarKazanmaSayilari[finalTakimlarList[i]] = 1;
	  }
	}
  
	for (let i = 0; i < data.length; i++) {
	  if (data[i]["Home Team Name"] in initialList === false) {
		initialList[data[i]["Home Team Name"]] = data[i]["Home Team Initials"];
	  } else if (data[i]["Away Team Name"] in initialList === false) {
		initialList[data[i]["Away Team Name"]] = data[i]["Away Team Initials"];
	  }
	}
  
	for (const key in finalTakimlarKazanmaSayilari) {
	  returnListe[initialList[key]] = finalTakimlarKazanmaSayilari[key];
	}
  
	result = initial + ": " + returnListe[initial];
	return result;
  }
  console.log(
	"Bonus 1 Kazanma Sayısı ITA",
	UlkelerinKazanmaSayilari(fifaData, "ITA")
  );
  
  /*  BONUS 2:  
  EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */
  
  function EnCokGolAtan(data) {
	let finalOynayanTakimlar = {};
  
	for (let i = 0; i < data.length; i++) {
	  if (data[i]["Stage"] === "Final") {
		finalOynayanTakimlar[data[i]["Home Team Name"]] = 0;
		finalOynayanTakimlar[data[i]["Away Team Name"]] = 0;
	  }
	}
  
	for (let i = 0; i < data.length; i++) {
	  if (data[i]["Stage"] === "Final") {
		finalOynayanTakimlar[data[i]["Home Team Name"]] +=
		  data[i]["Home Team Goals"];
	  }
	}
  
	for (let i = 0; i < data.length; i++) {
	  if (data[i]["Stage"] === "Final") {
		finalOynayanTakimlar[data[i]["Away Team Name"]] +=
		  data[i]["Away Team Goals"];
	  }
	}
	let enCokGolAtanTakimAdi = Object.keys(finalOynayanTakimlar)[0];
  
	for (let i = 0; i < Object.keys(finalOynayanTakimlar).length; i++) {
	  if (
		finalOynayanTakimlar[Object.keys(finalOynayanTakimlar)[i]] >
		finalOynayanTakimlar[enCokGolAtanTakimAdi]
	  ) {
		enCokGolAtanTakimAdi = Object.keys(finalOynayanTakimlar)[i];
	  }
	}
  
	let result =
	  enCokGolAtanTakimAdi + ": " + finalOynayanTakimlar[enCokGolAtanTakimAdi];
	return result;
  }
  console.log("Bonus 2 Finalde EnCokGolAtan", EnCokGolAtan(fifaData));
  
  /*  BONUS 3: 
  EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/
  
  function EnKotuDefans(data) {
	let finalOynayanTakimlar = {};
  
	for (let i = 0; i < data.length; i++) {
	  if (data[i]["Stage"] === "Final") {
		finalOynayanTakimlar[data[i]["Home Team Name"]] = 0;
		finalOynayanTakimlar[data[i]["Away Team Name"]] = 0;
	  }
	}
  
	for (let i = 0; i < data.length; i++) {
	  if (data[i]["Stage"] === "Final") {
		finalOynayanTakimlar[data[i]["Home Team Name"]] +=
		  data[i]["Away Team Goals"];
	  }
	}
  
	for (let i = 0; i < data.length; i++) {
	  if (data[i]["Stage"] === "Final") {
		finalOynayanTakimlar[data[i]["Away Team Name"]] +=
		  data[i]["Home Team Goals"];
	  }
	}
	let enCokGolYiyenTakimAdi = Object.keys(finalOynayanTakimlar)[0];
  
	for (let i = 0; i < Object.keys(finalOynayanTakimlar).length; i++) {
	  if (
		finalOynayanTakimlar[Object.keys(finalOynayanTakimlar)[i]] >
		finalOynayanTakimlar[enCokGolYiyenTakimAdi]
	  ) {
		enCokGolYiyenTakimAdi = Object.keys(finalOynayanTakimlar)[i];
	  }
	}
  
	let result =
	  enCokGolYiyenTakimAdi + ": " + finalOynayanTakimlar[enCokGolYiyenTakimAdi];
	return result;
  }
  
  console.log("Bonus 3 Finalde EnKotuDefans", EnKotuDefans(fifaData));
  /* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */
  
  function kacDefaKatildi(data, teamInitial) {
	let resultArray = [];
	let result = 0;
  
	for (let i = 0; i < data.length; i++) {
	  if (
		data[i]["Home Team Initials"] === teamInitial ||
		data[i]["Away Team Initials"] === teamInitial
	  ) {
		if (resultArray.includes(data[i]["Year"]) === false) {
		  resultArray.push(data[i]["Year"]);
		}
	  }
	}
  
	result = resultArray.length;
	return result;
  }
  
  console.log("Bonus 4 kacDefaKatildi ITA", kacDefaKatildi(fifaData, "ITA"));
  
  // Ülke kısaltmalarını parametre olarak alan ve dünya kupasında attıkları gol sayılarını(1930 sonrası) dönen bir fonksiyon yaratabilirsiniz.
  
  function kacGolAtti(data, initial) {
	let takimlar = {};
	let result = 0;
  
	for (let i = 0; i < data.length; i++) {
	  takimlar[data[i]["Home Team Initials"]] = 0;
	  takimlar[data[i]["Away Team Initials"]] = 0;
	}
  
	for (let i = 0; i < data.length; i++) {
	  takimlar[data[i]["Home Team Initials"]] += data[i]["Home Team Goals"];
	  takimlar[data[i]["Away Team Initials"]] += data[i]["Away Team Goals"];
	}
  
	result = takimlar[initial];
	return result;
  }
  
  console.log("Bonus 5", kacGolAtti(fifaData, "ITA"));
  

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}

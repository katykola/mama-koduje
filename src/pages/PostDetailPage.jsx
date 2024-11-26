import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import MainImage from '../components/MainImage';
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function PostDetailPage() {

const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchPost();
  }, [id]);

  

  if (!post) {
    return <Typography>Loading...</Typography>;
  }

    return(
        <>
        <Stack sx={{ border: '1px solid grey' }}>
            <Typography>24.5.2024</Typography>
            <Typography variant="h1">{post.title}</Typography>
            <Typography variant='body1'>Malá Ema má za chvíli jeden rok a tak je třeba trochu bilancovat a položit si otázku, jaký byl můj první rok na mateřské.</Typography>
            <MainImage imgSrc="/littlehand_desktop.jpg"/>
            <Typography>
            Všude se píše o spánku dětí, ale to, že je matka na hraně kolapsu z nevyspání se jaksi zametá pod koberec. Ono obecně se wellbeing matek tak nějak neřeší, ale to je na delší debatu.
            Před porodem jsem si myslela, že bude malá spát exkluzivně v postýlce u nás v ložnici. Jak už to bývá, člověk míní, dítě změní. Sice jsme to takto nějakou dobu praktikovali, ale postupem času se malá vkradla k nám do postele, její postýlka se nějak přišoupla k té naší a manžel zmizel do jiné místnosti.
            Je pěkná představa, když jste sami, že se nic nezmění a že si nenecháte zkazit pohodu. Ale ono jaksi stejně moc nijaká pohoda do minimálně roku a půl není (co bude potom ještě nevím:D edit: V roce a půl roce se to u nás hodně zlepšilo). Pohodu tedy můžete odstranit z rovnice a už se jen snažit přežít, co nejlépe to jde.
            </Typography>
            <Typography variant='h2'>Občas spím sama</Typography>
            <Typography>
            Zpátky ke spaní matek. Poté, co jsme jednou zkusili, jaké to je spát odděleně, už nebyla cesta zpět. Možnost vyspat se jako člověk je prostě nenahraditelná. Co je ovšem u nás jinak, je to, že se ve spaní bez malé střídáme.
            Přijde mi to tak přirozené, že přesně nevím, co k tomu napsat, ale všimla jsem si, že je zvykem, že s dítětem spí jen ženy a muž si pěkně spinká vedle. On o pak není divu, že vznikají rozpory, když je jeden kontinuálně bez spaní a druhý vyspinkaný do růžova. Sytý hladovému nevěří, že
            My ženy, máme tak nějak zakódované (čti vštípené společností), že se musíme obětovat. Třeba já, když vidím, že je muž nevyspaný nebo má nepohodu, tak mu okamžitě nabídnu, ať jde spát nehledě na to, jak moc jsem nevyspaná já. A to je cesta do pekla, vážené dámy. Protože pak následuje blbá nálada na naší straně (což je zcela pochopitelné, kdo by ji po roce nespaní neměl, že).
            Zcela logicky čekáme, že nám muž poleví, když nemáme energii něco řešit nebo jsme nepříjemné. Ale víte, co, nepoleví. Ono muži totiž mají docela krátkou paměť na to, jaký to je, když se někdo nebo oni sami nějak cítili. Jsou schopni s vámi souznít v momentu, kdy se cítí stejně, ale jakmile je nepohoda pryč, je pryč i empatie. A vy jste prostě jen nepříjemná a přeháníte. (Tady velmi generalizuju a omlouvám se těm, kteří to mají jinak. Tento popis slouží edukačním účelům )
            Abych to zkrátila. Opravdu zde není důvod, aby ses příliš obětovala. Tvoje oběť totiž nebude oceněna, ba naopak ho budeš svou pózou obětí štvát. Já doporučuji jít svému štěstí naproti a nechat muže, ať si také prožije radostné noční chvilky se svou ratolestí. Prostě se na roli oběti vykašli, nic ti to do života nepřinese.
            <Typography variant='h2'>On a ono to zvládnou</Typography>
            <Typography>
            Tady je další mýtus, který je nám rván do hlavy. Jmenuje se “matka je nezastupitelná”. K tomu bych řekla, že nezastupitelná je pro dítě pečující osoba, ke které se může přimknout a nemusí to být konkrétně matka. To jsem si nevycucala z prstu, tomuto tématu se věnuje psychologie a jmenuje se to teorie attachementu neboli citové vazby. A ano, mohou být tyto pečující osoby dvě a mohou se střídat.
            Dejte svému muži prostor, aby tuto situaci zvládl. Věřte tomu, že i on si dokáže vybudovat své strategie, jak dítě utišit. Vaše prsa nejsou spása světa (mámy s umělou výživou by mohly vyprávět), co je pro dítě důležité je to, že tam s ním je někdo, ke komu je citově připoutáno.
            Prostě nemusíte být u všeho. Zbavte se pocitu přehnané důležitosti.
            </Typography>
            <Typography variant='h2'>Mýtus: Po jedné noci přijdu o mlíko</Typography>
            <Typography variant='body1'>
                Toto je totální bullshit. Vyzkoušela jsem sama na sobě. Sice na začátku, kdy ještě kojení nebylo úplně stabilizované jsem ráno myslela, že mi praskne hrudník, ale za možnost se vyspat celou noc to rozhodně stálo.
                V praxi to funguje tak, že když mám svou spací noc, tak nakojím před spaním a pak ráno, když se dítě ráno vzbudí, tak mi ji manžel donese na kojení. Všechno funguje jak má.
                Mimochodem kojím i v noci, když se vzbudí. Vykašlala jsem se na nějaké poučky o tom, že by styl uspávání měl být pořád stejný. Malá velice dobře pozná, jestli vedle ní leží máma nebo táta. Jediné, co je u nás uspávací konstanta je nosítko, jelikož to je něco, co můžeme používat oba.
            </Typography>
            <Typography variant='h2'>Večer a ve volné dny uspává muž</Typography>
            <Typography>
                Tohle je podle mě extrémně důležitá věc, díky které (nejen) si ti dva vypěstovali silné pouto a díky čemuž u nás není období, kdy jsou děti fixované na matku nijak dramatické. Je to jen moje doměnka, ale věřím, že jsme tímto velmi přispěli k tomu, aby malá v klidu usínala u nás obou.
                Uspávání se muž chopil už od jejího narození, takže to pro ni je zcela normální, že ji muž vláčí po domě v nosítku, dokud to nezalomí.
            </Typography>
            <Typography variant='h2'>Spánek je důležitý pro psychické zdraví</Typography>
            <Typography>
                V tomto bodu bych chtěla říct, že přerušovaný spánek vypadá jako no big deal, ale nenechte se mýlit. Být vyrušován z hlubokého spánku je nejen nepříjemné, ale dokonce to dokáže i značně zamávat s psychikou.
                Já už se dostala do stádia, kdy jsem schopná ještě docela dobře fungovat i s blbým spaním. Jsem schopna potlačit fyzické příznaky únavy, ale přitom se divím, že se cítím blbě. Prostě nic mě nebaví, všechno vidím černě a trpím docela silnými úzkostmi. Upřímně tak nějak racionálně vím, že to je spánkem, ale pořád mám problém věřit tomu, že by spánek mohl mít tak velký vliv na náladu a prožívání.
                Můj muž je naštěstí v tomto osvícenější než já a je schopen mě donutit se jít vyspat, i přestože mám pocit, že to nepotřebuju a že ještě zvládnu nějakou dobu jet na záložní baterii.
            </Typography>
            <Typography variant='h2'>Závěr</Typography>
            <Typography>Tolik tedy k mým dojmům ohledně spaní s malým dítětem. My máme dítě jedno, takže chápu, že střídání je u více dětí problematické. Ovšem s tímto zkušenost nemám a nemohu ji tedy s vámi sdílet. </Typography>
            </Typography>
        </Stack>
        </>
    )
}
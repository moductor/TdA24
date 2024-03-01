/* eslint-disable react/no-unescaped-entities */
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { styleClasses } from "../../helpers/styleClasses";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className="content-grid">
      <div className="content-flow">
        <header>
          <Navbar showBackButton={true} />
        </header>

        <main className={styleClasses(styles, "main")}>
          {
            <p>
              <h1 className="title-1">Podmínky používání</h1>
              <h3 className="title-2">1. Podmínky</h3>
              Přístupem na tuto webovou stránku, která je přístupná z adresy{" "}
              <a href="http://dbd324c17e2d519b.app.tourdeapp.cz/">
                http://dbd324c17e2d519b.app.tourdeapp.cz
              </a>
              , souhlasíte s těmito Podmínkami používání webové stránky a
              souhlasíte s tím, že jste odpovědní za dodržování všech platných
              místních zákonů. Pokud s některou z těchto podmínek nesouhlasíte,
              je vám přístup na tyto stránky zakázán. Materiály obsažené na
              těchto webových stránkách jsou chráněny autorským právem a právem
              ochranných známek.
              <h3 className="title-2">2. Licence na používání</h3>
              Je uděleno povolení k dočasnému stažení jedné kopie materiálů na
              webových stránkách Učitelské digitální agentury, a to pouze pro
              osobní, nekomerční a přechodné prohlížení. Jedná se o udělení
              licence, nikoli o převod vlastnického práva, a na základě této
              licence nesmíte: upravovat nebo kopírovat materiály; používat
              materiály k jakýmkoli komerčním účelům nebo k jakémukoli veřejnému
              vystavování; pokoušet se o zpětnou analýzu jakéhokoli softwaru
              obsaženého na webových stránkách Teacher digital Agency;
              odstraňovat z materiálů jakékoli poznámky o autorských právech
              nebo jiných vlastnických právech; nebo předávat materiály jiné
              osobě nebo je "zrcadlit" na jiném serveru. To umožní agentuře
              Teacher digital Agency ukončit při porušení kteréhokoli z těchto
              omezení. Po ukončení bude ukončeno i vaše právo na prohlížení a
              měli byste zničit všechny stažené materiály, které máte v držení,
              ať už v tištěné nebo elektronické podobě. Tyto podmínky služby
              byly vytvořeny pomocí generátoru podmínek služby.
              <h3 className="title-2">3. Zřeknutí se odpovědnosti</h3>
              Veškeré materiály na webových stránkách Teacher digital Agency
              jsou poskytovány "tak, jak jsou". Agentura Teacher digital Agency
              neposkytuje žádné záruky, ať už výslovné nebo předpokládané, a
              proto popírá všechny ostatní záruky. Kromě toho společnost Teacher
              digital Agency neposkytuje žádná prohlášení týkající se přesnosti
              nebo spolehlivosti používání materiálů na svých Webových stránkách
              nebo jinak související s těmito materiály nebo jakýmikoliv
              stránkami, na které se na těchto Webových stránkách odkazuje.
              <h3 className="title-2">4. Omezení</h3>
              Agentura Teacher digital Agency ani její dodavatelé nenesou
              odpovědnost za žádné škody, které vzniknou v souvislosti s
              používáním nebo nemožností používat materiály na Webových
              stránkách agentury Teacher digital Agency, a to ani v případě, že
              agentura Teacher digital Agency nebo pověřený zástupce těchto
              Webových stránek byli na možnost vzniku takové škody ústně nebo
              písemně upozorněni. Některé jurisdikce neumožňují omezení
              předpokládaných záruk nebo omezení odpovědnosti za náhodné škody,
              tato omezení se na vás nemusí vztahovat.
              <h3 className="title-2">5. Revize a chyby</h3>
              Materiály uvedené na webových stránkách společnosti Teacher
              digital Agency mohou obsahovat technické, typografické nebo
              fotografické chyby. Agentura Teacher digital Agency neslibuje, že
              jakýkoli z materiálů na těchto webových stránkách je přesný, úplný
              nebo aktuální. Agentura Teacher digital Agency může materiály
              obsažené na svých Webových stránkách kdykoli bez předchozího
              upozornění změnit. Agentura Teacher digital Agency se nezavazuje k
              aktualizaci materiálů.
              <h3 className="title-2">6. Odkazy</h3>
              Agentura Teacher digital nezkontrolovala všechny stránky, na které
              odkazují její webové stránky, a neodpovídá za obsah takových
              stránek. Přítomnost jakéhokoli odkazu neznamená, že společnost
              Teacher digital Agency danou stránku podporuje. Používání
              jakýchkoli odkazovaných webových stránek je na vlastní riziko
              uživatele.
              <h3 className="title-2">7. Změny podmínek používání stránek</h3>
              Společnost Teacher digital Agency může tyto podmínky používání
              svých webových stránek kdykoli změnit bez předchozího upozornění.
              Používáním těchto webových stránek souhlasíte s tím, že se budete
              řídit aktuální verzí těchto Podmínek používání.
              <h3 className="title-2">8. Vaše soukromí</h3>
              Přečtěte si prosím naše Zásady ochrany osobních údajů.
              <h3 className="title-2">9. Rozhodné právo</h3>
              Jakékoli nároky související s webovými stránkami Teacher digital
              Agency se řídí právem České republiky bez ohledu na jeho kolizní
              ustanovení.
            </p>
          }
        </main>
      </div>

      <Footer />
    </div>
  );
}

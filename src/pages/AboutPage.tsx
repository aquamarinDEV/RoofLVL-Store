import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export function AboutPage() {
  usePageTitle('Despre noi')

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        <span>Despre noi</span>
      </div>

      <header className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Despre RoofLVL</h1>
            <p className="page-subtitle">
              Magazin online specializat în elemente de fixare pentru construcții și acoperișuri.
            </p>
          </div>
        </div>
      </header>

      <article className="legal-content">
        <p>
          <strong>RoofLVL</strong> este un magazin specializat în <strong>elemente de fixare
          profesionale</strong> pentru construcții și acoperișuri. Ne adresăm atât particulari, cât și{' '}
          <strong>profesioniști</strong> din domeniu: montatori de acoperișuri, firme de construcții,
          antreprenori și meșteșugari. Oferim soluții complete pentru orice proiect de pe șantier.
        </p>

        <p>
          Gama noastră include <strong>cuie în bandă de hârtie</strong>, <strong>cuie tip T</strong>,{' '}
          <strong>cuie beton</strong>, <strong>șuruburi autoforante</strong> pentru tablă și panouri,{' '}
          <strong>accesorii pentru țiglă metalică</strong>, <strong>Aluband</strong> pentru etanșări și
          multe altele. Lucrăm cu producători de încredere și ne asigurăm că produsele îndeplinesc
          standardele cerute pentru construcții rezistențe și durabile.
        </p>

        <p>
          Pentru comenzile <strong>B2B</strong> oferim <strong>prețuri mult mai avantajoase</strong> și
          livrare la șantier. Dacă un produs nu este în stoc, îl putem comanda special pentru
          dumneavoastră. Fotografiați produsul sau trimiteți dimensiunile prin formularul de contact sau{' '}
          <strong>WhatsApp (0785 754 952)</strong> și vă revenim rapid cu ofertă.
        </p>

        <p>
          Experiența noastră în domeniu ne permite să vă <strong>sfătuim</strong> în alegerea produselor
          potrivite proiectului vostru. Fie că construiți o casă nouă, reparați un acoperiș sau montați
          tablă cutată, avem soluția. Livrăm <strong>rapid</strong> și colaborăm cu clienți din toată țara.
        </p>

        <p>
          RoofLVL pune accent pe <strong>calitate</strong>, <strong>prețuri competitive</strong> și
          serviciu la fața locului. Contactați-ne pentru ofertă personalizată, informații despre produse
          sau pentru a comanda articole care nu apar în catalog. Suntem aici să vă ajutăm să finalizați
          proiectul la timp și la standard.
        </p>
      </article>
    </div>
  )
}


# Nastavení - Mockup

## Popis
Obrazovka nastavení umožňuje uživatelům konfigurovat různé parametry aplikace, jako je počet hostů, počet nocí, měna, směnný kurz a aplikace slevy.

## Wireframe - Desktop

```
+--------------------------------------------------+
| LOGO  Správa Minibaru                 Uživatel ▼ |
+--------------------------------------------------+
| [Výběr vily ▼] Oh Yeah Villa                     |
+--------------------------------------------------+
| < Zpět na Dashboard                              |
+--------------------------------------------------+
| NASTAVENÍ                                        |
|                                                  |
| +--------------------------------------------------+
| | ZÁKLADNÍ NASTAVENÍ                             | |
| |                                                | |
| | Počet hostů:  [- 4 +]                          | |
| | Počet nocí:   [- 3 +]                          | |
| |                                                | |
| | Sleva 10%:    [✓]                              | |
| |                                                | |
| | [ULOŽIT ZMĚNY]                                 | |
| +--------------------------------------------------+
|                                                  |
| +--------------------------------------------------+
| | NASTAVENÍ MĚNY                                 | |
| |                                                | |
| | Výchozí měna:  [CZK ▼]                         | |
| | Směnný kurz:   [1 EUR = 25 CZK]                | |
| |                                                | |
| | [ULOŽIT ZMĚNY]                                 | |
| +--------------------------------------------------+
|                                                  |
| +--------------------------------------------------+
| | UŽIVATELSKÉ NASTAVENÍ                          | |
| |                                                | |
| | Jazyk:        [Čeština ▼]                      | |
| | Notifikace:   [✓]                              | |
| |                                                | |
| | [ULOŽIT ZMĚNY]                                 | |
| +--------------------------------------------------+
|                                                  |
| +--------------------------------------------------+
| | SPRÁVA ÚČTU                                    | |
| |                                                | |
| | Změnit heslo                                   | |
| | Upravit profil                                 | |
| |                                                | |
| +--------------------------------------------------+
|                                                  |
+--------------------------------------------------+
| © 2025 Luxury Villas                              |
+--------------------------------------------------+
```

## Wireframe - Mobilní zařízení

```
+---------------------------+
| LOGO  Správa Minibaru  ☰ |
+---------------------------+
| [Výběr vily ▼]            |
| Oh Yeah Villa             |
+---------------------------+
| < Zpět na Dashboard       |
+---------------------------+
| NASTAVENÍ                 |
|                           |
| ZÁKLADNÍ NASTAVENÍ:       |
|                           |
| Počet hostů:  [- 4 +]     |
| Počet nocí:   [- 3 +]     |
|                           |
| Sleva 10%:    [✓]         |
|                           |
| [ULOŽIT ZMĚNY]            |
|                           |
| NASTAVENÍ MĚNY:           |
|                           |
| Výchozí měna:  [CZK ▼]    |
| Směnný kurz:              |
| [1 EUR = 25 CZK]          |
|                           |
| [ULOŽIT ZMĚNY]            |
|                           |
| UŽIVATELSKÉ NASTAVENÍ:    |
|                           |
| Jazyk:        [Čeština ▼] |
| Notifikace:   [✓]         |
|                           |
| [ULOŽIT ZMĚNY]            |
|                           |
| SPRÁVA ÚČTU:              |
|                           |
| Změnit heslo              |
| Upravit profil            |
|                           |
+---------------------------+
| © 2025 Luxury Villas      |
+---------------------------+
```

## Specifikace komponent

### Záhlaví (Header)
- Stejné jako na předchozích obrazovkách
- Odkaz "Zpět na Dashboard" pro návrat na hlavní obrazovku

### Základní nastavení
- Panel s nastavením základních parametrů aplikace:
  - Počet hostů: Číselné pole s tlačítky + a - pro změnu hodnoty
  - Počet nocí: Číselné pole s tlačítky + a - pro změnu hodnoty
  - Sleva 10%: Zaškrtávací pole pro aktivaci/deaktivaci slevy
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Světle šedá (#E0E0E0)
- Barva textu: Tmavě šedá (#333333)
- Barva tlačítek + a -: Tmavě modrá (#1A365D)
- Barva zaškrtávacího pole: Zlatá (#D4AF37) při zaškrtnutí

### Nastavení měny
- Panel s nastavením měny a směnného kurzu:
  - Výchozí měna: Rozbalovací seznam s možnostmi CZK a EUR
  - Směnný kurz: Textové pole pro zadání kurzu
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Světle šedá (#E0E0E0)
- Barva textu: Tmavě šedá (#333333)
- Barva rozbalovacího seznamu: Tmavě modrá (#1A365D) při rozbalení

### Uživatelské nastavení
- Panel s nastavením uživatelských preferencí:
  - Jazyk: Rozbalovací seznam s dostupnými jazyky (Čeština, Angličtina)
  - Notifikace: Zaškrtávací pole pro aktivaci/deaktivaci notifikací
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Světle šedá (#E0E0E0)
- Barva textu: Tmavě šedá (#333333)
- Barva rozbalovacího seznamu: Tmavě modrá (#1A365D) při rozbalení
- Barva zaškrtávacího pole: Zlatá (#D4AF37) při zaškrtnutí

### Správa účtu
- Panel s odkazy na správu uživatelského účtu:
  - Změnit heslo: Odkaz na obrazovku změny hesla
  - Upravit profil: Odkaz na obrazovku úpravy profilu
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Světle šedá (#E0E0E0)
- Barva textu odkazů: Tmavě modrá (#1A365D)
- Hover: Podtržení textu

### Tlačítka "Uložit změny"
- Tlačítka pro uložení změn v jednotlivých sekcích
- Barva pozadí: Zlatá (#D4AF37)
- Barva textu: Tmavě modrá (#1A365D)
- Velikost: 200px šířka, 44px výška
- Okraje: Zaoblené (4px)
- Hover: Tmavší odstín zlaté (#C09F2F)

## Interakce

1. **Změna počtu hostů a nocí**:
   - Kliknutím na "+" se zvýší hodnota o 1
   - Kliknutím na "-" se sníží hodnota o 1 (minimálně 1)
   - Přímé zadání čísla do pole

2. **Aktivace/deaktivace slevy**:
   - Kliknutím na zaškrtávací pole se aktivuje/deaktivuje 10% sleva

3. **Změna výchozí měny**:
   - Výběrem z rozbalovacího seznamu se změní výchozí měna aplikace

4. **Úprava směnného kurzu**:
   - Zadáním hodnoty do textového pole se změní směnný kurz
   - Validace zajišťuje, že hodnota je kladné číslo

5. **Změna jazyka**:
   - Výběrem z rozbalovacího seznamu se změní jazyk aplikace

6. **Aktivace/deaktivace notifikací**:
   - Kliknutím na zaškrtávací pole se aktivují/deaktivují notifikace

7. **Správa účtu**:
   - Kliknutím na "Změnit heslo" se uživatel přesměruje na obrazovku změny hesla
   - Kliknutím na "Upravit profil" se uživatel přesměruje na obrazovku úpravy profilu

8. **Uložení změn**:
   - Kliknutím na "ULOŽIT ZMĚNY" se uloží změny v příslušné sekci
   - Po úspěšném uložení se zobrazí potvrzení

## Responzivní chování

- **Desktop** (> 1024px):
  - Všechny panely pod sebou v plné šířce
  - Dostatečné mezery mezi panely
  - Tlačítka "Uložit změny" zarovnána vpravo

- **Tablet** (768px - 1024px):
  - Všechny panely pod sebou v plné šířce
  - Menší mezery mezi panely
  - Tlačítka "Uložit změny" zarovnána vpravo

- **Mobil** (< 768px):
  - Všechny panely pod sebou v plné šířce
  - Minimální mezery mezi panely
  - Tlačítka "Uložit změny" v plné šířce panelu

## Přístupnost

- Všechny interaktivní prvky mají dostatečnou velikost pro ovládání dotykem
- Kontrastní barvy pro dobrou čitelnost
- Popisky pro všechna vstupní pole
- Možnost ovládání pomocí klávesnice
- ARIA atributy pro lepší podporu screen readerů
- Potvrzení po uložení změn

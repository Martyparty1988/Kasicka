# Přihlašovací obrazovka - Mockup

## Popis
Přihlašovací obrazovka je vstupním bodem do aplikace "Správa Minibaru". Nabízí elegantní a jednoduchý design s důrazem na luxusní charakter vil.

## Wireframe - Desktop

```
+--------------------------------------------------+
|                                                  |
|                                                  |
|                  [LOGO APLIKACE]                 |
|                                                  |
|                "Správa Minibaru"                 |
|                                                  |
|  +------------------------------------------+    |
|  |                                          |    |
|  |  Uživatelské jméno                       |    |
|  |                                          |    |
|  +------------------------------------------+    |
|                                                  |
|  +------------------------------------------+    |
|  |                                          |    |
|  |  Heslo                               👁️  |    |
|  |                                          |    |
|  +------------------------------------------+    |
|                                                  |
|  [Zapomenuté heslo?]                             |
|                                                  |
|  +------------------------------------------+    |
|  |                                          |    |
|  |               PŘIHLÁSIT SE               |    |
|  |                                          |    |
|  +------------------------------------------+    |
|                                                  |
|                                                  |
|                                                  |
|  © 2025 Luxury Villas                            |
|                                                  |
+--------------------------------------------------+
```

## Wireframe - Mobilní zařízení

```
+---------------------------+
|                           |
|                           |
|      [LOGO APLIKACE]      |
|                           |
|     "Správa Minibaru"     |
|                           |
| +-------------------------+ |
| |                         | |
| | Uživatelské jméno       | |
| |                         | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| |                         | |
| | Heslo                👁️ | |
| |                         | |
| +-------------------------+ |
|                           |
| [Zapomenuté heslo?]        |
|                           |
| +-------------------------+ |
| |                         | |
| |      PŘIHLÁSIT SE       | |
| |                         | |
| +-------------------------+ |
|                           |
|                           |
| © 2025 Luxury Villas       |
|                           |
+---------------------------+
```

## Specifikace komponent

### Logo a název aplikace
- Logo: Elegantní, minimalistické logo aplikace
- Název: "Správa Minibaru" v písmu Playfair Display, 24px (desktop) / 20px (mobil)
- Umístění: Centrované v horní části obrazovky

### Přihlašovací formulář
- Textové pole pro uživatelské jméno:
  - Popisek: "Uživatelské jméno"
  - Validace: Povinné pole
  - Velikost: 100% šířky kontejneru, výška 44px
  - Okraje: Zaoblené (4px)
  - Barva pozadí: Bílá (#FFFFFF)
  - Barva okraje: Středně šedá (#E0E0E0)
  - Fokus: Tmavě modrá (#1A365D) okraj

- Textové pole pro heslo:
  - Popisek: "Heslo"
  - Typ: password (skryté znaky)
  - Ikona: Oko pro zobrazení/skrytí hesla
  - Validace: Povinné pole
  - Velikost: 100% šířky kontejneru, výška 44px
  - Okraje: Zaoblené (4px)
  - Barva pozadí: Bílá (#FFFFFF)
  - Barva okraje: Středně šedá (#E0E0E0)
  - Fokus: Tmavě modrá (#1A365D) okraj

- Odkaz "Zapomenuté heslo?":
  - Barva: Tmavě modrá (#1A365D)
  - Velikost písma: 14px
  - Umístění: Pod polem pro heslo, zarovnáno vlevo
  - Hover: Podtržení

- Tlačítko "PŘIHLÁSIT SE":
  - Barva pozadí: Zlatá (#D4AF37)
  - Barva textu: Tmavě modrá (#1A365D)
  - Velikost písma: 16px, tučné
  - Velikost: 100% šířky kontejneru, výška 48px
  - Okraje: Zaoblené (4px)
  - Hover: Tmavší odstín zlaté (#C09F2F)
  - Stisk: Ještě tmavší odstín zlaté (#B08F20)

### Patička
- Copyright text: "© 2025 Luxury Villas"
- Velikost písma: 14px
- Barva: Tmavě šedá (#333333)
- Umístění: Centrováno v dolní části obrazovky (desktop) / zarovnáno vlevo (mobil)

## Interakce

1. **Validace formuláře**:
   - Při pokusu o přihlášení bez vyplnění povinných polí se zobrazí chybová hláška pod příslušným polem
   - Chybová hláška: "Toto pole je povinné" v červené barvě (#F44336)

2. **Zobrazení/skrytí hesla**:
   - Kliknutím na ikonu oka se přepíná mezi zobrazením a skrytím hesla
   - Výchozí stav: heslo skryté

3. **Zapomenuté heslo**:
   - Kliknutím na odkaz "Zapomenuté heslo?" se uživatel přesměruje na obrazovku pro obnovu hesla

4. **Přihlášení**:
   - Kliknutím na tlačítko "PŘIHLÁSIT SE" se odešle formulář
   - Během ověřování se zobrazí indikátor načítání (spinner) na tlačítku
   - Při úspěšném přihlášení je uživatel přesměrován na dashboard
   - Při neúspěšném přihlášení se zobrazí chybová hláška nad formulářem

## Responzivní chování

- **Desktop** (> 1024px):
  - Přihlašovací formulář má maximální šířku 400px a je centrován
  - Větší mezery mezi prvky

- **Tablet** (768px - 1024px):
  - Přihlašovací formulář má maximální šířku 350px a je centrován
  - Mírně menší mezery mezi prvky

- **Mobil** (< 768px):
  - Přihlašovací formulář zabírá 90% šířky obrazovky
  - Menší mezery mezi prvky
  - Menší velikost písma pro nadpisy

## Přístupnost

- Všechna pole formuláře mají přiřazené popisky (labels)
- Dostatečný kontrast mezi textem a pozadím
- Možnost navigace pomocí klávesnice (tab, enter)
- Chybové hlášky jsou oznámeny screen readerům
- Všechny interaktivní prvky mají minimální velikost 44x44px pro snadné ovládání dotykem

// Visual record. Citations only. Journal photographs are not copied onto
// this domain: the figure stays with the publisher, and this file stores
// what the photograph is allowed to claim. Gray-market progress shots are
// out of scope and are not represented as entries.

export type RecordKind =
  | 'mole-change'
  | 'whole-skin'
  | 'melanocortin-disease'
  | 'approved-endpoint'
  | 'reference-scale';

export interface SkinRecordEntry {
  id: string;
  kind: RecordKind;
  title: string;
  /** What a reader is allowed to take from the image. */
  claim: string;
  /** What the image must not be used to say. */
  notAClaim: string;
  citation: string;
  href?: string;
  /** Why the pixels are not hosted here. */
  hosting: string;
  hosted: false;
}

export const recordKinds: { id: RecordKind; label: string }[] = [
  { id: 'mole-change', label: 'Mole change' },
  { id: 'whole-skin', label: 'The same skin, many moles' },
  { id: 'melanocortin-disease', label: 'Pigment without a beach' },
  { id: 'approved-endpoint', label: 'Approved-drug endpoints' },
  { id: 'reference-scale', label: 'Fitzpatrick reference' },
];

export const skinRecord: SkinRecordEntry[] = [
  {
    id: 'hueso-2012',
    kind: 'mole-change',
    title: 'New and changing moles after reported melanotan use',
    claim:
      'A phototype II man in his twenties reported new and rapidly changing moles after using a product sold as Melanotan II. Clinicians counted more than 100 melanocytic nevi, mostly on the back. He regularly used tanning beds. Ten of the most atypical were removed; histopathology was dysplastic nevi, three with severe dysplasia. A pigmented basal-cell carcinoma on the shoulder was also removed.',
    notAClaim:
      'The report does not prove the compound caused a melanoma, and it is not a result to copy. It does not state a dose anyone should use.',
    citation:
      'Hueso-Gabriel L, et al. Eruptive dysplastic nevi following melanotan use. Actas Dermosifiliogr. 2012;103(4):329–331.',
    href: 'https://actasdermo.org/en-eruptive-dysplastic-nevi-following-melanotan-articulo-S1578219012001357',
    hosting:
      'Clinical and dermatoscopic figures remain on the journal site. They are not republished here.',
    hosted: false,
  },
  {
    id: 'cardones-2009',
    kind: 'whole-skin',
    title: 'New and old moles, checked against a photograph from the year before',
    claim:
      'A 40-year-old man with a prior melanoma and atypical nevi grew new pigmented nevi and watched existing ones darken and look more irregular within weeks of injecting a product sold as Melanotan II. The change was confirmed against clinic photographs from a year earlier. After he stopped, the nevi lightened over the following months and the growth features faded. Two biopsies were dysplastic nevi.',
    notAClaim:
      'A before-and-after of the trunk is a surveillance document, not a tan. The paper’s conclusion is that synthetic α-MSH peptides can drive neoplastic melanocytes in a predisposed patient. Causation of a new melanoma is not established by this case.',
    citation:
      'Cardones AR, Grichnik JM. α-Melanocyte-stimulating hormone–induced eruptive nevi. Arch Dermatol. 2009;145(4):441–444.',
    href: 'https://jamanetwork.com/journals/jamadermatology/fullarticle/711987',
    hosting:
      'The comparison photographs and dermatoscopic images stay at JAMA Dermatology.',
    hosted: false,
  },
  {
    id: 'cousen-2009',
    kind: 'mole-change',
    title: 'Eruptive naevi after an injection sold as melanotan',
    claim:
      'Cousen, Colver, and Helbling reported eruptive melanocytic naevi after injection of an unlicensed peptide sold as melanotan, in a young woman who also used tanning beds. The letter sits in the same cluster as Langan’s earlier report of rapidly changing moles.',
    notAClaim:
      'A case letter is an alarm, not a rate. It does not rank products and it does not clear any individual new mole.',
    citation:
      'Cousen P, Colver G, Helbling I. Eruptive melanocytic naevi following melanotan injection. Br J Dermatol. 2009;161(3):707–708.',
    href: 'https://academic.oup.com/bjd/article/161/3/707/6642168',
    hosting: 'The letter’s figures stay with the British Journal of Dermatology.',
    hosted: false,
  },
  {
    id: 'addison',
    kind: 'melanocortin-disease',
    title: 'Addisonian darkening: the high state, with no vial',
    claim:
      'In primary adrenal insufficiency, excess ACTH activates MC1R. Skin darkens in creases, scars, gums, and sun-exposed sites. Physicians have used a new photograph that no longer matches the old one as a clue. The darkening is melanocortin drive and it is a disease.',
    notAClaim:
      'It is not evidence that a cosmetic agonist is “what the body already does,” and it is not a tanning result. This page does not advise on treating adrenal failure.',
    citation:
      'Standard clinical descriptions of Addisonian pigmentation. No single patient photograph is adopted as the site’s figure.',
    hosting:
      'Teaching photographs of identifiable patients are not hosted. The page draws the sites, not a person.',
    hosted: false,
  },
  {
    id: 'epp-nejm-2015',
    kind: 'approved-endpoint',
    title: 'Afamelanotide in erythropoietic protoporphyria: hours of light, not a tan',
    claim:
      'The randomized trials of the approved implant measured time spent outdoors without pain from visible light, in people with a rare phototoxic disease. A positive result is a photoprotection endpoint in that disease.',
    notAClaim:
      'It is not a cosmetic before-and-after, and it is not evidence about Melanotan II. Any trial photograph, if one is published, answers the disease question only.',
    citation:
      'Langendonk JG, Balwani M, Anderson KE, et al. Afamelanotide for erythropoietic protoporphyria. N Engl J Med. 2015;373(1):48–59.',
    href: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1411481',
    hosting: 'Trial figures stay with the New England Journal of Medicine.',
    hosted: false,
  },
  {
    id: 'cuv105-slot',
    kind: 'approved-endpoint',
    title: 'CUV105 vitiligo readout: the slot is empty until the paper exists',
    claim:
      'When the sponsor publishes the Phase III figures, the only claim this record will store is repigmentation of vitiligo on the trial’s own scores (T-VASI50, F-VASI75), in diagnosed patients, Fitzpatrick types specified by the protocol.',
    notAClaim:
      'A repigmentation photograph is not photoprotection and not a cosmetic tan. Nothing is entered here in advance of the paper.',
    citation:
      'Clinuvel CUV105, topline expected December 2026. No citable figure yet. See the regulatory tracker.',
    href: '/regulatory/',
    hosting: 'No image is reserved, downloaded, or described as a result before publication.',
    hosted: false,
  },
];

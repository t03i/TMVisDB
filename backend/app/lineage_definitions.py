from enum import Enum


class Topology(Enum):
    ALL = "All"
    BOTH = "Both"
    ALPHA_HELIX = "Alpha-helix"
    BETA_STRAND = "Beta-strand"


class TaxaSelectionCriterion(Enum):
    ORGANISM = "Organism ID"
    DOMAIN = "Domain/Kingdom"


class Domain(Enum):
    ALL = "All"
    BACTERIA = "Bacteria"
    EUKARYOTA = "Eukaryota"
    ARCHAEA = "Archaea"
    UNCLASSIFIED = "unclassified sequences"


class Kingdom(Enum):
    pass


class Archaea(Kingdom):
    ALL = "All Archaea"
    ASGARD_GROUP = "Asgard group"
    HYDROTHERMARCHAEOTA = "Candidatus Hydrothermarchaeota"
    THERMOPLASMATOTA = "Candidatus Thermoplasmatota"
    DPANN_GROUP = "DPANN group"
    EURYARCHAEOTA = "Euryarchaeota"
    TACK_GROUP = "TACK group"
    ARCHA_INCERTAE_SEDIS = "Archaea incertae sedis"
    UNCLASSIFIED_ARCHAEA = "unclassified Archaea"
    ENVIRONMENTAL_SAMPLES = "environmental samples"


class Eukaryota(Kingdom):
    ALL = "All Eukaryota"
    AMOEBOZOA = "Amoebozoa"
    ANCYROMONADIDA = "Ancyromonadida"
    APUSOZOA = "Apusozoa"
    BREVITEA = "Breviatea"
    CRUMS = "CRuMs"
    CRYPTOPHYCEAE = "Cryptophyceae (cryptomonads)"
    DISCOBA = "Discoba"
    GLAUCOCYSTOPHYCEAE = "Glaucocystophyceae"
    HAPTISTA = "Haptista"
    HEMIMASTIGOPHORA = "Hemimastigophora"
    MALAWIMONADIDA = "Malawimonadida"
    METAMONADA = "Metamonada"
    OPISTHOKONTA = "Opisthokonta"
    RHODELPHEA = "Rhodelphea"
    RHODOPHYTA = "Rhodophyta (red algae)"
    SAR = "Sar"
    VIRIDIPLANTAE = "Viridiplantae"
    EUKARYOTA_INCERTAE_SEDIS = "Eukaryota incertae sedis"
    UNCLASSIFIED_EUKARYOTES = "unclassified eukaryotes"
    ENVIRONMENTAL_SAMPLES = "environmental samples"


class Bacteria(Kingdom):
    ALL = "All Bacteria"
    ACIDOBACTERIA = "Acidobacteria"
    AQUIFICAE = "Aquificae"
    ATRIBACTEROA = "Atribacterota"
    CALDISERICA_CRYOSERICOTA_GROUP = "Caldiserica/Cryosericota group"
    CALDITRICHAEOTA = "Calditrichaeota"
    CANDIDATUS_KRUMHOLZIBACTERIOTA = "Candidatus Krumholzibacteriota"
    CANDIDATUS_THARPELLOTA = "Candidatus Tharpellota"
    CHRYSIOGENETES = "Chrysiogenetes"
    COLEOSPERMUM = "Coleospermum"
    COPROTHERMOBACTEROTA = "Coprothermobacterota"
    DEFERRIBACTERES = "Deferribacteres"
    DESULFOBACTEROTA = "Desulfobacterota"
    DICTYOGLOMI = "Dictyoglomi"
    ELUSIMICROBIA = "Elusimicrobia"
    FCB_GROUP = "FCB group"
    FUSOBACTERIA = "Fusobacteria"
    MYXOCCOCOTA = "Myxococcota"
    NITROSFINAE_TECTOMICROBIA_GROUP = "Nitrospinae/Tectomicrobia group"
    NITROSPIRAE = "Nitrospirae"
    PROTEOBACTERIA = "Proteobacteria"
    PVC_GROUP = "PVC group"
    SPIROCHAETES = "Spirochaetes"
    SYNERGISTETES = "Synergistetes"
    TERRABACTERIA_GROUP = "Terrabacteria group"
    THERMODESULFOBACTERIA = "Thermodesulfobacteria"
    THERMOTOGAE = "Thermotogae"
    BACTERIA_INCERTAE_SEDIS = "Bacteria incertae sedis"
    UNCLASSIFIED_BACTERIA = "unclassified Bacteria"
    ENVIRONMENTAL_SAMPLES = "environmental samples"


AllKingdoms = Kingdom(
    "AllKingdoms",
    {
        "ALL": "All",
        **{item.name: item.value for item in Archaea if item.name != "ALL"},
        **{item.name: item.value for item in Eukaryota if item.name != "ALL"},
        **{item.name: item.value for item in Bacteria if item.name != "ALL"},
    },
)

DOMAIN_MAP = {
    Domain.ARCHAEA: Archaea,
    Domain.BACTERIA: Bacteria,
    Domain.EUKARYOTA: Eukaryota,
    Domain.ALL: AllKingdoms,
    Domain.UNCLASSIFIED: AllKingdoms,
}


def get_kingdom_for_domain(domain: Domain):
    if domain in Domain:
        kingdom_type = DOMAIN_MAP[domain]
    else:
        kingdom_type = AllKingdoms
    return kingdom_type

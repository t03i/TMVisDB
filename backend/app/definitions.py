from typing import Union
from enum import Enum


class DatabaseType(str, Enum):
    tmvis = "tmvis"
    topdb = "topdb"
    membranome = "membranome"
    uniprot = "uniprot"
    tmalphafold = "tmalphafold"


class Topology(Enum):
    ALL = "All"
    BOTH = "Both"
    ALPHA_HELIX = "Alpha-helix"
    BETA_STRAND = "Beta-strand"


class Taxonomy(Enum):
    ARCHAEA = "Archaea"
    EUKARYOTA = "Eukaryota"
    BACTERIA = "Bacteria"
    UNCLASSIFIED = "unclassified sequences"

    # Kingdom Archaea
    ARCHAEA_BASGARD_GROUP = "Asgard group"
    ARCHAEA_HYDROTHERMARCHAEOTA = "Candidatus Hydrothermarchaeota"
    ARCHAEA_THERMOPLASMATOTA = "Candidatus Thermoplasmatota"
    ARCHAEA_DPANN_GROUP = "DPANN group"
    ARCHAEA_EURYARCHAEOTA = "Euryarchaeota"
    ARCHAEA_TACK_GROUP = "TACK group"
    ARCHAEA_ARCHA_INCERTAE_SEDIS = "Archaea incertae sedis"
    ARCHAEA_UNCLASSIFIED = "unclassified Archaea"
    ARCHAEA_ENVIRONMENTAL_SAMPLES = "environmental samples"

    # Kingdom Eukaryota
    EUKARYOTA_AMOEBOZOA = "Amoebozoa"
    EUKARYOTA_ANCYROMONADIDA = "Ancyromonadida"
    EUKARYOTA_APUSOZOA = "Apusozoa"
    EUKARYOTA_BREVITEA = "Breviatea"
    EUKARYOTA_CRUMS = "CRuMs"
    EUKARYOTA_CRYPTOPHYCEAE = "Cryptophyceae (cryptomonads)"
    EUKARYOTA_DISCOBA = "Discoba"
    EUKARYOTA_GLAUCOCYSTOPHYCEAE = "Glaucocystophyceae"
    EUKARYOTA_HAPTISTA = "Haptista"
    EUKARYOTA_HEMIMASTIGOPHORA = "Hemimastigophora"
    EUKARYOTA_MALAWIMONADIDA = "Malawimonadida"
    EUKARYOTA_METAMONADA = "Metamonada"
    EUKARYOTA_OPISTHOKONTA = "Opisthokonta"
    EUKARYOTA_RHODELPHEA = "Rhodelphea"
    EUKARYOTA_RHODOPHYTA = "Rhodophyta (red algae)"
    EUKARYOTA_SAR = "Sar"
    EUKARYOTA_VIRIDIPLANTAE = "Viridiplantae"
    EUKARYOTA_EUKARYOTA_INCERTAE_SEDIS = "Eukaryota incertae sedis"
    EUKARYOTA_UNCLASSIFIED = "unclassified eukaryotes"
    EUKARYOTA_ENVIRONMENTAL_SAMPLES = "environmental samples"

    # Kingdom Bacteria
    BACTERIA_ACIDOBACTERIA = "Acidobacteria"
    BACTERIA_AQUIFICAE = "Aquificae"
    BACTERIA_ATRIBACTEROA = "Atribacterota"
    BACTERIA_CALDISERICA_CRYOSERICOTA_GROUP = "Caldiserica/Cryosericota group"
    BACTERIA_CALDITRICHAEOTA = "Calditrichaeota"
    BACTERIA_CANDIDATUS_KRUMHOLZIBACTERIOTA = "Candidatus Krumholzibacteriota"
    BACTERIA_CANDIDATUS_THARPELLOTA = "Candidatus Tharpellota"
    BACTERIA_CHRYSIOGENETES = "Chrysiogenetes"
    BACTERIA_COLEOSPERMUM = "Coleospermum"
    BACTERIA_COPROTHERMOBACTEROTA = "Coprothermobacterota"
    BACTERIA_DEFERRIBACTERES = "Deferribacteres"
    BACTERIA_DESULFOBACTEROTA = "Desulfobacterota"
    BACTERIA_DICTYOGLOMI = "Dictyoglomi"
    BACTERIA_ELUSIMICROBIA = "Elusimicrobia"
    BACTERIA_FCB_GROUP = "FCB group"
    BACTERIA_FUSOBACTERIA = "Fusobacteria"
    BACTERIA_MYXOCCOCOTA = "Myxococcota"
    BACTERIA_NITROSFINAE_TECTOMICROBIA_GROUP = "Nitrospinae/Tectomicrobia group"
    BACTERIA_NITROSPIRAE = "Nitrospirae"
    BACTERIA_PROTEOBACTERIA = "Proteobacteria"
    BACTERIA_PVC_GROUP = "PVC group"
    BACTERIA_SPIROCHAETES = "Spirochaetes"
    BACTERIA_SYNERGISTETES = "Synergistetes"
    BACTERIA_TERRABACTERIA_GROUP = "Terrabacteria group"
    BACTERIA_THERMODESULFOBACTERIA = "Thermodesulfobacteria"
    BACTERIA_THERMOTOGAE = "Thermotogae"
    BACTERIA_BACTERIA_INCERTAE_SEDIS = "Bacteria incertae sedis"
    BACTERIA_UNCLASSIFIED = "unclassified Bacteria"
    BACTERIA_ENVIRONMENTAL_SAMPLES = "environmental samples"

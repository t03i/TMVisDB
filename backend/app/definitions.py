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

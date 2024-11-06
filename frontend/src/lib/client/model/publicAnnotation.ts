/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * TMVis
 * OpenAPI spec version: 0.1.0
 */
import type { PublicAnnotationSourceDbRef } from './publicAnnotationSourceDbRef';
import type { PublicAnnotationSourceDbUrl } from './publicAnnotationSourceDbUrl';

export interface PublicAnnotation {
  date_added: string;
  end: number;
  /** @maxLength 100 */
  label: string;
  source_db: string;
  source_db_ref?: PublicAnnotationSourceDbRef;
  source_db_url: PublicAnnotationSourceDbUrl;
  start: number;
}

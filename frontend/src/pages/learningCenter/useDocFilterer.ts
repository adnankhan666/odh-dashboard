import * as React from 'react';
import { useQueryParams } from '../../utilities/useQueryParams';
import { OdhDocument } from '../../types';
import {
  APPLICATION_FILTER_KEY,
  CATEGORY_FILTER_KEY,
  DOC_TYPE_FILTER_KEY,
  ENABLED_FILTER_KEY,
  SEARCH_FILTER_KEY,
} from './const';
import { matchesCategories, matchesSearch } from '../../utilities/utils';

export const useDocFilterer = (): ((odhDocs: OdhDocument[]) => OdhDocument[]) => {
  const queryParams = useQueryParams();
  const enabled = queryParams.get(ENABLED_FILTER_KEY);
  const docTypes = queryParams.get(DOC_TYPE_FILTER_KEY);
  const applications = queryParams.get(APPLICATION_FILTER_KEY);
  const category = queryParams.get(CATEGORY_FILTER_KEY) || '';
  const searchQuery = queryParams.get(SEARCH_FILTER_KEY) || '';

  return React.useCallback(
    (odhDocs: OdhDocument[]) =>
      odhDocs
        .filter((odhDoc) => !enabled || enabled.includes(`${odhDoc.spec.appEnabled}`))
        .filter((odhDoc) => !docTypes || docTypes.includes(`${odhDoc.metadata.type}`))
        .filter((odhDoc) => !applications || applications.includes(`${odhDoc.spec.appDisplayName}`))
        .filter((odhDoc) => matchesCategories(odhDoc, category))
        .filter((odhDoc) => matchesSearch(odhDoc, searchQuery)),
    [category, docTypes, enabled, applications, searchQuery],
  );
};
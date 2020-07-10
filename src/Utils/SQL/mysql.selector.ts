// graphql-sql options serializer

import IReadOptions = GQL.IReadOptions;

/*
"order": {"key": "id", "value": -1}
 */

export function SerializeIReadOptions(options: IReadOptions) {
  if (Object.keys(options).length > 0) {
    const { order, byId, select, skip, take } = options;

    const new_options: INewOptions = { order, select, skip, take } as any;
    if (new_options.order) {
      new_options.order = {};
      new_options.order[order.key] = order.value as any;
    }

    return { new_options, byId };
  }

  return { new_options: null, byId: null };
}

interface INewOptions {
  /**
   * Offset (paginated) where from entities should be taken.
   */
  skip?: number | null;

  /**
   * Limit (paginated) - max number of entities should be taken.
   */
  take?: number | null;

  /**
   * Order, in which entities should be ordered.
   */

  order?: {
    [a: string]: 1 | -1;
  };

  /**
   * Specifies what columns should be retrieved.
   */
  select?: (string | null)[] | null;
}

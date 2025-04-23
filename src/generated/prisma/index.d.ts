
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Case
 * 
 */
export type Case = $Result.DefaultSelection<Prisma.$CasePayload>
/**
 * Model ExtractedDoc
 * 
 */
export type ExtractedDoc = $Result.DefaultSelection<Prisma.$ExtractedDocPayload>
/**
 * Model Todo
 * 
 */
export type Todo = $Result.DefaultSelection<Prisma.$TodoPayload>
/**
 * Model LegalTerm
 * 
 */
export type LegalTerm = $Result.DefaultSelection<Prisma.$LegalTermPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const LegalKnowledge: {
  NONE: 'NONE',
  BASIC: 'BASIC',
  INTERMEDIATE: 'INTERMEDIATE',
  LAWYER: 'LAWYER'
};

export type LegalKnowledge = (typeof LegalKnowledge)[keyof typeof LegalKnowledge]


export const CaseStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED'
};

export type CaseStatus = (typeof CaseStatus)[keyof typeof CaseStatus]


export const TodoStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  IGNORED: 'IGNORED'
};

export type TodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus]

}

export type LegalKnowledge = $Enums.LegalKnowledge

export const LegalKnowledge: typeof $Enums.LegalKnowledge

export type CaseStatus = $Enums.CaseStatus

export const CaseStatus: typeof $Enums.CaseStatus

export type TodoStatus = $Enums.TodoStatus

export const TodoStatus: typeof $Enums.TodoStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.case`: Exposes CRUD operations for the **Case** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cases
    * const cases = await prisma.case.findMany()
    * ```
    */
  get case(): Prisma.CaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.extractedDoc`: Exposes CRUD operations for the **ExtractedDoc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExtractedDocs
    * const extractedDocs = await prisma.extractedDoc.findMany()
    * ```
    */
  get extractedDoc(): Prisma.ExtractedDocDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.todo`: Exposes CRUD operations for the **Todo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Todos
    * const todos = await prisma.todo.findMany()
    * ```
    */
  get todo(): Prisma.TodoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.legalTerm`: Exposes CRUD operations for the **LegalTerm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LegalTerms
    * const legalTerms = await prisma.legalTerm.findMany()
    * ```
    */
  get legalTerm(): Prisma.LegalTermDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Case: 'Case',
    ExtractedDoc: 'ExtractedDoc',
    Todo: 'Todo',
    LegalTerm: 'LegalTerm'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "case" | "extractedDoc" | "todo" | "legalTerm"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Case: {
        payload: Prisma.$CasePayload<ExtArgs>
        fields: Prisma.CaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          findFirst: {
            args: Prisma.CaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          findMany: {
            args: Prisma.CaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>[]
          }
          create: {
            args: Prisma.CaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          createMany: {
            args: Prisma.CaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>[]
          }
          delete: {
            args: Prisma.CaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          update: {
            args: Prisma.CaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          deleteMany: {
            args: Prisma.CaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>[]
          }
          upsert: {
            args: Prisma.CaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          aggregate: {
            args: Prisma.CaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCase>
          }
          groupBy: {
            args: Prisma.CaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseCountArgs<ExtArgs>
            result: $Utils.Optional<CaseCountAggregateOutputType> | number
          }
        }
      }
      ExtractedDoc: {
        payload: Prisma.$ExtractedDocPayload<ExtArgs>
        fields: Prisma.ExtractedDocFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExtractedDocFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExtractedDocFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload>
          }
          findFirst: {
            args: Prisma.ExtractedDocFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExtractedDocFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload>
          }
          findMany: {
            args: Prisma.ExtractedDocFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload>[]
          }
          create: {
            args: Prisma.ExtractedDocCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload>
          }
          createMany: {
            args: Prisma.ExtractedDocCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExtractedDocCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload>[]
          }
          delete: {
            args: Prisma.ExtractedDocDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload>
          }
          update: {
            args: Prisma.ExtractedDocUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload>
          }
          deleteMany: {
            args: Prisma.ExtractedDocDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExtractedDocUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExtractedDocUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload>[]
          }
          upsert: {
            args: Prisma.ExtractedDocUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractedDocPayload>
          }
          aggregate: {
            args: Prisma.ExtractedDocAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExtractedDoc>
          }
          groupBy: {
            args: Prisma.ExtractedDocGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExtractedDocGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExtractedDocCountArgs<ExtArgs>
            result: $Utils.Optional<ExtractedDocCountAggregateOutputType> | number
          }
        }
      }
      Todo: {
        payload: Prisma.$TodoPayload<ExtArgs>
        fields: Prisma.TodoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TodoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TodoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          findFirst: {
            args: Prisma.TodoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TodoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          findMany: {
            args: Prisma.TodoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>[]
          }
          create: {
            args: Prisma.TodoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          createMany: {
            args: Prisma.TodoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TodoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>[]
          }
          delete: {
            args: Prisma.TodoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          update: {
            args: Prisma.TodoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          deleteMany: {
            args: Prisma.TodoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TodoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TodoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>[]
          }
          upsert: {
            args: Prisma.TodoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          aggregate: {
            args: Prisma.TodoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTodo>
          }
          groupBy: {
            args: Prisma.TodoGroupByArgs<ExtArgs>
            result: $Utils.Optional<TodoGroupByOutputType>[]
          }
          count: {
            args: Prisma.TodoCountArgs<ExtArgs>
            result: $Utils.Optional<TodoCountAggregateOutputType> | number
          }
        }
      }
      LegalTerm: {
        payload: Prisma.$LegalTermPayload<ExtArgs>
        fields: Prisma.LegalTermFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LegalTermFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LegalTermFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload>
          }
          findFirst: {
            args: Prisma.LegalTermFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LegalTermFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload>
          }
          findMany: {
            args: Prisma.LegalTermFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload>[]
          }
          create: {
            args: Prisma.LegalTermCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload>
          }
          createMany: {
            args: Prisma.LegalTermCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LegalTermCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload>[]
          }
          delete: {
            args: Prisma.LegalTermDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload>
          }
          update: {
            args: Prisma.LegalTermUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload>
          }
          deleteMany: {
            args: Prisma.LegalTermDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LegalTermUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LegalTermUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload>[]
          }
          upsert: {
            args: Prisma.LegalTermUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegalTermPayload>
          }
          aggregate: {
            args: Prisma.LegalTermAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLegalTerm>
          }
          groupBy: {
            args: Prisma.LegalTermGroupByArgs<ExtArgs>
            result: $Utils.Optional<LegalTermGroupByOutputType>[]
          }
          count: {
            args: Prisma.LegalTermCountArgs<ExtArgs>
            result: $Utils.Optional<LegalTermCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    case?: CaseOmit
    extractedDoc?: ExtractedDocOmit
    todo?: TodoOmit
    legalTerm?: LegalTermOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    cases: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cases?: boolean | UserCountOutputTypeCountCasesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
  }


  /**
   * Count Type CaseCountOutputType
   */

  export type CaseCountOutputType = {
    todos: number
    extractedDocs: number
  }

  export type CaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    todos?: boolean | CaseCountOutputTypeCountTodosArgs
    extractedDocs?: boolean | CaseCountOutputTypeCountExtractedDocsArgs
  }

  // Custom InputTypes
  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCountOutputType
     */
    select?: CaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountTodosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TodoWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountExtractedDocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExtractedDocWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    jailTimeYears: number | null
  }

  export type UserSumAggregateOutputType = {
    jailTimeYears: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    profession: string | null
    legalKnowledge: $Enums.LegalKnowledge | null
    jailTimeYears: number | null
    warningSeverity: string | null
    pendingCaseType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    profession: string | null
    legalKnowledge: $Enums.LegalKnowledge | null
    jailTimeYears: number | null
    warningSeverity: string | null
    pendingCaseType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    profession: number
    legalKnowledge: number
    jailTimeYears: number
    warningSeverity: number
    pendingCaseType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    jailTimeYears?: true
  }

  export type UserSumAggregateInputType = {
    jailTimeYears?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    profession?: true
    legalKnowledge?: true
    jailTimeYears?: true
    warningSeverity?: true
    pendingCaseType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    profession?: true
    legalKnowledge?: true
    jailTimeYears?: true
    warningSeverity?: true
    pendingCaseType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    profession?: true
    legalKnowledge?: true
    jailTimeYears?: true
    warningSeverity?: true
    pendingCaseType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    profession: string | null
    legalKnowledge: $Enums.LegalKnowledge
    jailTimeYears: number | null
    warningSeverity: string | null
    pendingCaseType: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    profession?: boolean
    legalKnowledge?: boolean
    jailTimeYears?: boolean
    warningSeverity?: boolean
    pendingCaseType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cases?: boolean | User$casesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    profession?: boolean
    legalKnowledge?: boolean
    jailTimeYears?: boolean
    warningSeverity?: boolean
    pendingCaseType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    profession?: boolean
    legalKnowledge?: boolean
    jailTimeYears?: boolean
    warningSeverity?: boolean
    pendingCaseType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    profession?: boolean
    legalKnowledge?: boolean
    jailTimeYears?: boolean
    warningSeverity?: boolean
    pendingCaseType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "profession" | "legalKnowledge" | "jailTimeYears" | "warningSeverity" | "pendingCaseType" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cases?: boolean | User$casesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      cases: Prisma.$CasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      profession: string | null
      legalKnowledge: $Enums.LegalKnowledge
      jailTimeYears: number | null
      warningSeverity: string | null
      pendingCaseType: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cases<T extends User$casesArgs<ExtArgs> = {}>(args?: Subset<T, User$casesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly profession: FieldRef<"User", 'String'>
    readonly legalKnowledge: FieldRef<"User", 'LegalKnowledge'>
    readonly jailTimeYears: FieldRef<"User", 'Int'>
    readonly warningSeverity: FieldRef<"User", 'String'>
    readonly pendingCaseType: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.cases
   */
  export type User$casesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    cursor?: CaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Case
   */

  export type AggregateCase = {
    _count: CaseCountAggregateOutputType | null
    _min: CaseMinAggregateOutputType | null
    _max: CaseMaxAggregateOutputType | null
  }

  export type CaseMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    status: $Enums.CaseStatus | null
    opponent: string | null
    evidence: boolean | null
    agreement: boolean | null
    impact: string | null
    intent: string | null
    finalAnalysis: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    status: $Enums.CaseStatus | null
    opponent: string | null
    evidence: boolean | null
    agreement: boolean | null
    impact: string | null
    intent: string | null
    finalAnalysis: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    status: number
    opponent: number
    timeline: number
    evidence: number
    agreement: number
    impact: number
    intent: number
    involvedLaws: number
    finalAnalysis: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CaseMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    status?: true
    opponent?: true
    evidence?: true
    agreement?: true
    impact?: true
    intent?: true
    finalAnalysis?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    status?: true
    opponent?: true
    evidence?: true
    agreement?: true
    impact?: true
    intent?: true
    finalAnalysis?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    status?: true
    opponent?: true
    timeline?: true
    evidence?: true
    agreement?: true
    impact?: true
    intent?: true
    involvedLaws?: true
    finalAnalysis?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Case to aggregate.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cases
    **/
    _count?: true | CaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseMaxAggregateInputType
  }

  export type GetCaseAggregateType<T extends CaseAggregateArgs> = {
        [P in keyof T & keyof AggregateCase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCase[P]>
      : GetScalarType<T[P], AggregateCase[P]>
  }




  export type CaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithAggregationInput | CaseOrderByWithAggregationInput[]
    by: CaseScalarFieldEnum[] | CaseScalarFieldEnum
    having?: CaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseCountAggregateInputType | true
    _min?: CaseMinAggregateInputType
    _max?: CaseMaxAggregateInputType
  }

  export type CaseGroupByOutputType = {
    id: string
    userId: string
    title: string
    description: string
    status: $Enums.CaseStatus
    opponent: string | null
    timeline: string[]
    evidence: boolean
    agreement: boolean
    impact: string | null
    intent: string | null
    involvedLaws: string[]
    finalAnalysis: string | null
    createdAt: Date
    updatedAt: Date
    _count: CaseCountAggregateOutputType | null
    _min: CaseMinAggregateOutputType | null
    _max: CaseMaxAggregateOutputType | null
  }

  type GetCaseGroupByPayload<T extends CaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseGroupByOutputType[P]>
            : GetScalarType<T[P], CaseGroupByOutputType[P]>
        }
      >
    >


  export type CaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    opponent?: boolean
    timeline?: boolean
    evidence?: boolean
    agreement?: boolean
    impact?: boolean
    intent?: boolean
    involvedLaws?: boolean
    finalAnalysis?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    todos?: boolean | Case$todosArgs<ExtArgs>
    extractedDocs?: boolean | Case$extractedDocsArgs<ExtArgs>
    _count?: boolean | CaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    opponent?: boolean
    timeline?: boolean
    evidence?: boolean
    agreement?: boolean
    impact?: boolean
    intent?: boolean
    involvedLaws?: boolean
    finalAnalysis?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    opponent?: boolean
    timeline?: boolean
    evidence?: boolean
    agreement?: boolean
    impact?: boolean
    intent?: boolean
    involvedLaws?: boolean
    finalAnalysis?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    opponent?: boolean
    timeline?: boolean
    evidence?: boolean
    agreement?: boolean
    impact?: boolean
    intent?: boolean
    involvedLaws?: boolean
    finalAnalysis?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "status" | "opponent" | "timeline" | "evidence" | "agreement" | "impact" | "intent" | "involvedLaws" | "finalAnalysis" | "createdAt" | "updatedAt", ExtArgs["result"]["case"]>
  export type CaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    todos?: boolean | Case$todosArgs<ExtArgs>
    extractedDocs?: boolean | Case$extractedDocsArgs<ExtArgs>
    _count?: boolean | CaseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Case"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      todos: Prisma.$TodoPayload<ExtArgs>[]
      extractedDocs: Prisma.$ExtractedDocPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      description: string
      status: $Enums.CaseStatus
      opponent: string | null
      timeline: string[]
      evidence: boolean
      agreement: boolean
      impact: string | null
      intent: string | null
      involvedLaws: string[]
      finalAnalysis: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["case"]>
    composites: {}
  }

  type CaseGetPayload<S extends boolean | null | undefined | CaseDefaultArgs> = $Result.GetResult<Prisma.$CasePayload, S>

  type CaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseCountAggregateInputType | true
    }

  export interface CaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Case'], meta: { name: 'Case' } }
    /**
     * Find zero or one Case that matches the filter.
     * @param {CaseFindUniqueArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseFindUniqueArgs>(args: SelectSubset<T, CaseFindUniqueArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Case that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseFindUniqueOrThrowArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Case that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseFindFirstArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseFindFirstArgs>(args?: SelectSubset<T, CaseFindFirstArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Case that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseFindFirstOrThrowArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cases
     * const cases = await prisma.case.findMany()
     * 
     * // Get first 10 Cases
     * const cases = await prisma.case.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseWithIdOnly = await prisma.case.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseFindManyArgs>(args?: SelectSubset<T, CaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Case.
     * @param {CaseCreateArgs} args - Arguments to create a Case.
     * @example
     * // Create one Case
     * const Case = await prisma.case.create({
     *   data: {
     *     // ... data to create a Case
     *   }
     * })
     * 
     */
    create<T extends CaseCreateArgs>(args: SelectSubset<T, CaseCreateArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cases.
     * @param {CaseCreateManyArgs} args - Arguments to create many Cases.
     * @example
     * // Create many Cases
     * const case = await prisma.case.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseCreateManyArgs>(args?: SelectSubset<T, CaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cases and returns the data saved in the database.
     * @param {CaseCreateManyAndReturnArgs} args - Arguments to create many Cases.
     * @example
     * // Create many Cases
     * const case = await prisma.case.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cases and only return the `id`
     * const caseWithIdOnly = await prisma.case.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Case.
     * @param {CaseDeleteArgs} args - Arguments to delete one Case.
     * @example
     * // Delete one Case
     * const Case = await prisma.case.delete({
     *   where: {
     *     // ... filter to delete one Case
     *   }
     * })
     * 
     */
    delete<T extends CaseDeleteArgs>(args: SelectSubset<T, CaseDeleteArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Case.
     * @param {CaseUpdateArgs} args - Arguments to update one Case.
     * @example
     * // Update one Case
     * const case = await prisma.case.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseUpdateArgs>(args: SelectSubset<T, CaseUpdateArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cases.
     * @param {CaseDeleteManyArgs} args - Arguments to filter Cases to delete.
     * @example
     * // Delete a few Cases
     * const { count } = await prisma.case.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseDeleteManyArgs>(args?: SelectSubset<T, CaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cases
     * const case = await prisma.case.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseUpdateManyArgs>(args: SelectSubset<T, CaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cases and returns the data updated in the database.
     * @param {CaseUpdateManyAndReturnArgs} args - Arguments to update many Cases.
     * @example
     * // Update many Cases
     * const case = await prisma.case.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cases and only return the `id`
     * const caseWithIdOnly = await prisma.case.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CaseUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Case.
     * @param {CaseUpsertArgs} args - Arguments to update or create a Case.
     * @example
     * // Update or create a Case
     * const case = await prisma.case.upsert({
     *   create: {
     *     // ... data to create a Case
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Case we want to update
     *   }
     * })
     */
    upsert<T extends CaseUpsertArgs>(args: SelectSubset<T, CaseUpsertArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCountArgs} args - Arguments to filter Cases to count.
     * @example
     * // Count the number of Cases
     * const count = await prisma.case.count({
     *   where: {
     *     // ... the filter for the Cases we want to count
     *   }
     * })
    **/
    count<T extends CaseCountArgs>(
      args?: Subset<T, CaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Case.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CaseAggregateArgs>(args: Subset<T, CaseAggregateArgs>): Prisma.PrismaPromise<GetCaseAggregateType<T>>

    /**
     * Group by Case.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseGroupByArgs['orderBy'] }
        : { orderBy?: CaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Case model
   */
  readonly fields: CaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Case.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    todos<T extends Case$todosArgs<ExtArgs> = {}>(args?: Subset<T, Case$todosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    extractedDocs<T extends Case$extractedDocsArgs<ExtArgs> = {}>(args?: Subset<T, Case$extractedDocsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Case model
   */
  interface CaseFieldRefs {
    readonly id: FieldRef<"Case", 'String'>
    readonly userId: FieldRef<"Case", 'String'>
    readonly title: FieldRef<"Case", 'String'>
    readonly description: FieldRef<"Case", 'String'>
    readonly status: FieldRef<"Case", 'CaseStatus'>
    readonly opponent: FieldRef<"Case", 'String'>
    readonly timeline: FieldRef<"Case", 'String[]'>
    readonly evidence: FieldRef<"Case", 'Boolean'>
    readonly agreement: FieldRef<"Case", 'Boolean'>
    readonly impact: FieldRef<"Case", 'String'>
    readonly intent: FieldRef<"Case", 'String'>
    readonly involvedLaws: FieldRef<"Case", 'String[]'>
    readonly finalAnalysis: FieldRef<"Case", 'String'>
    readonly createdAt: FieldRef<"Case", 'DateTime'>
    readonly updatedAt: FieldRef<"Case", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Case findUnique
   */
  export type CaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case findUniqueOrThrow
   */
  export type CaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case findFirst
   */
  export type CaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cases.
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cases.
     */
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Case findFirstOrThrow
   */
  export type CaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cases.
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cases.
     */
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Case findMany
   */
  export type CaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Cases to fetch.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cases.
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Case create
   */
  export type CaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Case.
     */
    data: XOR<CaseCreateInput, CaseUncheckedCreateInput>
  }

  /**
   * Case createMany
   */
  export type CaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cases.
     */
    data: CaseCreateManyInput | CaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Case createManyAndReturn
   */
  export type CaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * The data used to create many Cases.
     */
    data: CaseCreateManyInput | CaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Case update
   */
  export type CaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Case.
     */
    data: XOR<CaseUpdateInput, CaseUncheckedUpdateInput>
    /**
     * Choose, which Case to update.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case updateMany
   */
  export type CaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cases.
     */
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyInput>
    /**
     * Filter which Cases to update
     */
    where?: CaseWhereInput
    /**
     * Limit how many Cases to update.
     */
    limit?: number
  }

  /**
   * Case updateManyAndReturn
   */
  export type CaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * The data used to update Cases.
     */
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyInput>
    /**
     * Filter which Cases to update
     */
    where?: CaseWhereInput
    /**
     * Limit how many Cases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Case upsert
   */
  export type CaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Case to update in case it exists.
     */
    where: CaseWhereUniqueInput
    /**
     * In case the Case found by the `where` argument doesn't exist, create a new Case with this data.
     */
    create: XOR<CaseCreateInput, CaseUncheckedCreateInput>
    /**
     * In case the Case was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseUpdateInput, CaseUncheckedUpdateInput>
  }

  /**
   * Case delete
   */
  export type CaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter which Case to delete.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case deleteMany
   */
  export type CaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cases to delete
     */
    where?: CaseWhereInput
    /**
     * Limit how many Cases to delete.
     */
    limit?: number
  }

  /**
   * Case.todos
   */
  export type Case$todosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    where?: TodoWhereInput
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    cursor?: TodoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Case.extractedDocs
   */
  export type Case$extractedDocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    where?: ExtractedDocWhereInput
    orderBy?: ExtractedDocOrderByWithRelationInput | ExtractedDocOrderByWithRelationInput[]
    cursor?: ExtractedDocWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExtractedDocScalarFieldEnum | ExtractedDocScalarFieldEnum[]
  }

  /**
   * Case without action
   */
  export type CaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
  }


  /**
   * Model ExtractedDoc
   */

  export type AggregateExtractedDoc = {
    _count: ExtractedDocCountAggregateOutputType | null
    _min: ExtractedDocMinAggregateOutputType | null
    _max: ExtractedDocMaxAggregateOutputType | null
  }

  export type ExtractedDocMinAggregateOutputType = {
    id: string | null
    docId: string | null
    title: string | null
    caseId: string | null
    rawContent: string | null
    aiSummary: string | null
    createdAt: Date | null
  }

  export type ExtractedDocMaxAggregateOutputType = {
    id: string | null
    docId: string | null
    title: string | null
    caseId: string | null
    rawContent: string | null
    aiSummary: string | null
    createdAt: Date | null
  }

  export type ExtractedDocCountAggregateOutputType = {
    id: number
    docId: number
    title: number
    caseId: number
    rawContent: number
    aiSummary: number
    createdAt: number
    _all: number
  }


  export type ExtractedDocMinAggregateInputType = {
    id?: true
    docId?: true
    title?: true
    caseId?: true
    rawContent?: true
    aiSummary?: true
    createdAt?: true
  }

  export type ExtractedDocMaxAggregateInputType = {
    id?: true
    docId?: true
    title?: true
    caseId?: true
    rawContent?: true
    aiSummary?: true
    createdAt?: true
  }

  export type ExtractedDocCountAggregateInputType = {
    id?: true
    docId?: true
    title?: true
    caseId?: true
    rawContent?: true
    aiSummary?: true
    createdAt?: true
    _all?: true
  }

  export type ExtractedDocAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExtractedDoc to aggregate.
     */
    where?: ExtractedDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExtractedDocs to fetch.
     */
    orderBy?: ExtractedDocOrderByWithRelationInput | ExtractedDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExtractedDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExtractedDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExtractedDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExtractedDocs
    **/
    _count?: true | ExtractedDocCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExtractedDocMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExtractedDocMaxAggregateInputType
  }

  export type GetExtractedDocAggregateType<T extends ExtractedDocAggregateArgs> = {
        [P in keyof T & keyof AggregateExtractedDoc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExtractedDoc[P]>
      : GetScalarType<T[P], AggregateExtractedDoc[P]>
  }




  export type ExtractedDocGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExtractedDocWhereInput
    orderBy?: ExtractedDocOrderByWithAggregationInput | ExtractedDocOrderByWithAggregationInput[]
    by: ExtractedDocScalarFieldEnum[] | ExtractedDocScalarFieldEnum
    having?: ExtractedDocScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExtractedDocCountAggregateInputType | true
    _min?: ExtractedDocMinAggregateInputType
    _max?: ExtractedDocMaxAggregateInputType
  }

  export type ExtractedDocGroupByOutputType = {
    id: string
    docId: string
    title: string
    caseId: string
    rawContent: string
    aiSummary: string
    createdAt: Date
    _count: ExtractedDocCountAggregateOutputType | null
    _min: ExtractedDocMinAggregateOutputType | null
    _max: ExtractedDocMaxAggregateOutputType | null
  }

  type GetExtractedDocGroupByPayload<T extends ExtractedDocGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExtractedDocGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExtractedDocGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExtractedDocGroupByOutputType[P]>
            : GetScalarType<T[P], ExtractedDocGroupByOutputType[P]>
        }
      >
    >


  export type ExtractedDocSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    docId?: boolean
    title?: boolean
    caseId?: boolean
    rawContent?: boolean
    aiSummary?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["extractedDoc"]>

  export type ExtractedDocSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    docId?: boolean
    title?: boolean
    caseId?: boolean
    rawContent?: boolean
    aiSummary?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["extractedDoc"]>

  export type ExtractedDocSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    docId?: boolean
    title?: boolean
    caseId?: boolean
    rawContent?: boolean
    aiSummary?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["extractedDoc"]>

  export type ExtractedDocSelectScalar = {
    id?: boolean
    docId?: boolean
    title?: boolean
    caseId?: boolean
    rawContent?: boolean
    aiSummary?: boolean
    createdAt?: boolean
  }

  export type ExtractedDocOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "docId" | "title" | "caseId" | "rawContent" | "aiSummary" | "createdAt", ExtArgs["result"]["extractedDoc"]>
  export type ExtractedDocInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type ExtractedDocIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type ExtractedDocIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }

  export type $ExtractedDocPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExtractedDoc"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      docId: string
      title: string
      caseId: string
      rawContent: string
      aiSummary: string
      createdAt: Date
    }, ExtArgs["result"]["extractedDoc"]>
    composites: {}
  }

  type ExtractedDocGetPayload<S extends boolean | null | undefined | ExtractedDocDefaultArgs> = $Result.GetResult<Prisma.$ExtractedDocPayload, S>

  type ExtractedDocCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExtractedDocFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExtractedDocCountAggregateInputType | true
    }

  export interface ExtractedDocDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExtractedDoc'], meta: { name: 'ExtractedDoc' } }
    /**
     * Find zero or one ExtractedDoc that matches the filter.
     * @param {ExtractedDocFindUniqueArgs} args - Arguments to find a ExtractedDoc
     * @example
     * // Get one ExtractedDoc
     * const extractedDoc = await prisma.extractedDoc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExtractedDocFindUniqueArgs>(args: SelectSubset<T, ExtractedDocFindUniqueArgs<ExtArgs>>): Prisma__ExtractedDocClient<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExtractedDoc that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExtractedDocFindUniqueOrThrowArgs} args - Arguments to find a ExtractedDoc
     * @example
     * // Get one ExtractedDoc
     * const extractedDoc = await prisma.extractedDoc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExtractedDocFindUniqueOrThrowArgs>(args: SelectSubset<T, ExtractedDocFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExtractedDocClient<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExtractedDoc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractedDocFindFirstArgs} args - Arguments to find a ExtractedDoc
     * @example
     * // Get one ExtractedDoc
     * const extractedDoc = await prisma.extractedDoc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExtractedDocFindFirstArgs>(args?: SelectSubset<T, ExtractedDocFindFirstArgs<ExtArgs>>): Prisma__ExtractedDocClient<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExtractedDoc that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractedDocFindFirstOrThrowArgs} args - Arguments to find a ExtractedDoc
     * @example
     * // Get one ExtractedDoc
     * const extractedDoc = await prisma.extractedDoc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExtractedDocFindFirstOrThrowArgs>(args?: SelectSubset<T, ExtractedDocFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExtractedDocClient<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExtractedDocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractedDocFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExtractedDocs
     * const extractedDocs = await prisma.extractedDoc.findMany()
     * 
     * // Get first 10 ExtractedDocs
     * const extractedDocs = await prisma.extractedDoc.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const extractedDocWithIdOnly = await prisma.extractedDoc.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExtractedDocFindManyArgs>(args?: SelectSubset<T, ExtractedDocFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExtractedDoc.
     * @param {ExtractedDocCreateArgs} args - Arguments to create a ExtractedDoc.
     * @example
     * // Create one ExtractedDoc
     * const ExtractedDoc = await prisma.extractedDoc.create({
     *   data: {
     *     // ... data to create a ExtractedDoc
     *   }
     * })
     * 
     */
    create<T extends ExtractedDocCreateArgs>(args: SelectSubset<T, ExtractedDocCreateArgs<ExtArgs>>): Prisma__ExtractedDocClient<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExtractedDocs.
     * @param {ExtractedDocCreateManyArgs} args - Arguments to create many ExtractedDocs.
     * @example
     * // Create many ExtractedDocs
     * const extractedDoc = await prisma.extractedDoc.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExtractedDocCreateManyArgs>(args?: SelectSubset<T, ExtractedDocCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExtractedDocs and returns the data saved in the database.
     * @param {ExtractedDocCreateManyAndReturnArgs} args - Arguments to create many ExtractedDocs.
     * @example
     * // Create many ExtractedDocs
     * const extractedDoc = await prisma.extractedDoc.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExtractedDocs and only return the `id`
     * const extractedDocWithIdOnly = await prisma.extractedDoc.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExtractedDocCreateManyAndReturnArgs>(args?: SelectSubset<T, ExtractedDocCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExtractedDoc.
     * @param {ExtractedDocDeleteArgs} args - Arguments to delete one ExtractedDoc.
     * @example
     * // Delete one ExtractedDoc
     * const ExtractedDoc = await prisma.extractedDoc.delete({
     *   where: {
     *     // ... filter to delete one ExtractedDoc
     *   }
     * })
     * 
     */
    delete<T extends ExtractedDocDeleteArgs>(args: SelectSubset<T, ExtractedDocDeleteArgs<ExtArgs>>): Prisma__ExtractedDocClient<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExtractedDoc.
     * @param {ExtractedDocUpdateArgs} args - Arguments to update one ExtractedDoc.
     * @example
     * // Update one ExtractedDoc
     * const extractedDoc = await prisma.extractedDoc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExtractedDocUpdateArgs>(args: SelectSubset<T, ExtractedDocUpdateArgs<ExtArgs>>): Prisma__ExtractedDocClient<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExtractedDocs.
     * @param {ExtractedDocDeleteManyArgs} args - Arguments to filter ExtractedDocs to delete.
     * @example
     * // Delete a few ExtractedDocs
     * const { count } = await prisma.extractedDoc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExtractedDocDeleteManyArgs>(args?: SelectSubset<T, ExtractedDocDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExtractedDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractedDocUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExtractedDocs
     * const extractedDoc = await prisma.extractedDoc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExtractedDocUpdateManyArgs>(args: SelectSubset<T, ExtractedDocUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExtractedDocs and returns the data updated in the database.
     * @param {ExtractedDocUpdateManyAndReturnArgs} args - Arguments to update many ExtractedDocs.
     * @example
     * // Update many ExtractedDocs
     * const extractedDoc = await prisma.extractedDoc.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExtractedDocs and only return the `id`
     * const extractedDocWithIdOnly = await prisma.extractedDoc.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExtractedDocUpdateManyAndReturnArgs>(args: SelectSubset<T, ExtractedDocUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExtractedDoc.
     * @param {ExtractedDocUpsertArgs} args - Arguments to update or create a ExtractedDoc.
     * @example
     * // Update or create a ExtractedDoc
     * const extractedDoc = await prisma.extractedDoc.upsert({
     *   create: {
     *     // ... data to create a ExtractedDoc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExtractedDoc we want to update
     *   }
     * })
     */
    upsert<T extends ExtractedDocUpsertArgs>(args: SelectSubset<T, ExtractedDocUpsertArgs<ExtArgs>>): Prisma__ExtractedDocClient<$Result.GetResult<Prisma.$ExtractedDocPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExtractedDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractedDocCountArgs} args - Arguments to filter ExtractedDocs to count.
     * @example
     * // Count the number of ExtractedDocs
     * const count = await prisma.extractedDoc.count({
     *   where: {
     *     // ... the filter for the ExtractedDocs we want to count
     *   }
     * })
    **/
    count<T extends ExtractedDocCountArgs>(
      args?: Subset<T, ExtractedDocCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExtractedDocCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExtractedDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractedDocAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExtractedDocAggregateArgs>(args: Subset<T, ExtractedDocAggregateArgs>): Prisma.PrismaPromise<GetExtractedDocAggregateType<T>>

    /**
     * Group by ExtractedDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractedDocGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExtractedDocGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExtractedDocGroupByArgs['orderBy'] }
        : { orderBy?: ExtractedDocGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExtractedDocGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExtractedDocGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExtractedDoc model
   */
  readonly fields: ExtractedDocFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExtractedDoc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExtractedDocClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExtractedDoc model
   */
  interface ExtractedDocFieldRefs {
    readonly id: FieldRef<"ExtractedDoc", 'String'>
    readonly docId: FieldRef<"ExtractedDoc", 'String'>
    readonly title: FieldRef<"ExtractedDoc", 'String'>
    readonly caseId: FieldRef<"ExtractedDoc", 'String'>
    readonly rawContent: FieldRef<"ExtractedDoc", 'String'>
    readonly aiSummary: FieldRef<"ExtractedDoc", 'String'>
    readonly createdAt: FieldRef<"ExtractedDoc", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExtractedDoc findUnique
   */
  export type ExtractedDocFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    /**
     * Filter, which ExtractedDoc to fetch.
     */
    where: ExtractedDocWhereUniqueInput
  }

  /**
   * ExtractedDoc findUniqueOrThrow
   */
  export type ExtractedDocFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    /**
     * Filter, which ExtractedDoc to fetch.
     */
    where: ExtractedDocWhereUniqueInput
  }

  /**
   * ExtractedDoc findFirst
   */
  export type ExtractedDocFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    /**
     * Filter, which ExtractedDoc to fetch.
     */
    where?: ExtractedDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExtractedDocs to fetch.
     */
    orderBy?: ExtractedDocOrderByWithRelationInput | ExtractedDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExtractedDocs.
     */
    cursor?: ExtractedDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExtractedDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExtractedDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExtractedDocs.
     */
    distinct?: ExtractedDocScalarFieldEnum | ExtractedDocScalarFieldEnum[]
  }

  /**
   * ExtractedDoc findFirstOrThrow
   */
  export type ExtractedDocFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    /**
     * Filter, which ExtractedDoc to fetch.
     */
    where?: ExtractedDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExtractedDocs to fetch.
     */
    orderBy?: ExtractedDocOrderByWithRelationInput | ExtractedDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExtractedDocs.
     */
    cursor?: ExtractedDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExtractedDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExtractedDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExtractedDocs.
     */
    distinct?: ExtractedDocScalarFieldEnum | ExtractedDocScalarFieldEnum[]
  }

  /**
   * ExtractedDoc findMany
   */
  export type ExtractedDocFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    /**
     * Filter, which ExtractedDocs to fetch.
     */
    where?: ExtractedDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExtractedDocs to fetch.
     */
    orderBy?: ExtractedDocOrderByWithRelationInput | ExtractedDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExtractedDocs.
     */
    cursor?: ExtractedDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExtractedDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExtractedDocs.
     */
    skip?: number
    distinct?: ExtractedDocScalarFieldEnum | ExtractedDocScalarFieldEnum[]
  }

  /**
   * ExtractedDoc create
   */
  export type ExtractedDocCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    /**
     * The data needed to create a ExtractedDoc.
     */
    data: XOR<ExtractedDocCreateInput, ExtractedDocUncheckedCreateInput>
  }

  /**
   * ExtractedDoc createMany
   */
  export type ExtractedDocCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExtractedDocs.
     */
    data: ExtractedDocCreateManyInput | ExtractedDocCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExtractedDoc createManyAndReturn
   */
  export type ExtractedDocCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * The data used to create many ExtractedDocs.
     */
    data: ExtractedDocCreateManyInput | ExtractedDocCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExtractedDoc update
   */
  export type ExtractedDocUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    /**
     * The data needed to update a ExtractedDoc.
     */
    data: XOR<ExtractedDocUpdateInput, ExtractedDocUncheckedUpdateInput>
    /**
     * Choose, which ExtractedDoc to update.
     */
    where: ExtractedDocWhereUniqueInput
  }

  /**
   * ExtractedDoc updateMany
   */
  export type ExtractedDocUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExtractedDocs.
     */
    data: XOR<ExtractedDocUpdateManyMutationInput, ExtractedDocUncheckedUpdateManyInput>
    /**
     * Filter which ExtractedDocs to update
     */
    where?: ExtractedDocWhereInput
    /**
     * Limit how many ExtractedDocs to update.
     */
    limit?: number
  }

  /**
   * ExtractedDoc updateManyAndReturn
   */
  export type ExtractedDocUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * The data used to update ExtractedDocs.
     */
    data: XOR<ExtractedDocUpdateManyMutationInput, ExtractedDocUncheckedUpdateManyInput>
    /**
     * Filter which ExtractedDocs to update
     */
    where?: ExtractedDocWhereInput
    /**
     * Limit how many ExtractedDocs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExtractedDoc upsert
   */
  export type ExtractedDocUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    /**
     * The filter to search for the ExtractedDoc to update in case it exists.
     */
    where: ExtractedDocWhereUniqueInput
    /**
     * In case the ExtractedDoc found by the `where` argument doesn't exist, create a new ExtractedDoc with this data.
     */
    create: XOR<ExtractedDocCreateInput, ExtractedDocUncheckedCreateInput>
    /**
     * In case the ExtractedDoc was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExtractedDocUpdateInput, ExtractedDocUncheckedUpdateInput>
  }

  /**
   * ExtractedDoc delete
   */
  export type ExtractedDocDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
    /**
     * Filter which ExtractedDoc to delete.
     */
    where: ExtractedDocWhereUniqueInput
  }

  /**
   * ExtractedDoc deleteMany
   */
  export type ExtractedDocDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExtractedDocs to delete
     */
    where?: ExtractedDocWhereInput
    /**
     * Limit how many ExtractedDocs to delete.
     */
    limit?: number
  }

  /**
   * ExtractedDoc without action
   */
  export type ExtractedDocDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtractedDoc
     */
    select?: ExtractedDocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExtractedDoc
     */
    omit?: ExtractedDocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractedDocInclude<ExtArgs> | null
  }


  /**
   * Model Todo
   */

  export type AggregateTodo = {
    _count: TodoCountAggregateOutputType | null
    _min: TodoMinAggregateOutputType | null
    _max: TodoMaxAggregateOutputType | null
  }

  export type TodoMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    dueAt: Date | null
    status: $Enums.TodoStatus | null
    caseId: string | null
    createdAt: Date | null
  }

  export type TodoMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    dueAt: Date | null
    status: $Enums.TodoStatus | null
    caseId: string | null
    createdAt: Date | null
  }

  export type TodoCountAggregateOutputType = {
    id: number
    title: number
    description: number
    dueAt: number
    status: number
    caseId: number
    createdAt: number
    _all: number
  }


  export type TodoMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    dueAt?: true
    status?: true
    caseId?: true
    createdAt?: true
  }

  export type TodoMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    dueAt?: true
    status?: true
    caseId?: true
    createdAt?: true
  }

  export type TodoCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    dueAt?: true
    status?: true
    caseId?: true
    createdAt?: true
    _all?: true
  }

  export type TodoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Todo to aggregate.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Todos
    **/
    _count?: true | TodoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TodoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TodoMaxAggregateInputType
  }

  export type GetTodoAggregateType<T extends TodoAggregateArgs> = {
        [P in keyof T & keyof AggregateTodo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTodo[P]>
      : GetScalarType<T[P], AggregateTodo[P]>
  }




  export type TodoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TodoWhereInput
    orderBy?: TodoOrderByWithAggregationInput | TodoOrderByWithAggregationInput[]
    by: TodoScalarFieldEnum[] | TodoScalarFieldEnum
    having?: TodoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TodoCountAggregateInputType | true
    _min?: TodoMinAggregateInputType
    _max?: TodoMaxAggregateInputType
  }

  export type TodoGroupByOutputType = {
    id: string
    title: string
    description: string | null
    dueAt: Date | null
    status: $Enums.TodoStatus
    caseId: string
    createdAt: Date
    _count: TodoCountAggregateOutputType | null
    _min: TodoMinAggregateOutputType | null
    _max: TodoMaxAggregateOutputType | null
  }

  type GetTodoGroupByPayload<T extends TodoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TodoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TodoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TodoGroupByOutputType[P]>
            : GetScalarType<T[P], TodoGroupByOutputType[P]>
        }
      >
    >


  export type TodoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    dueAt?: boolean
    status?: boolean
    caseId?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["todo"]>

  export type TodoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    dueAt?: boolean
    status?: boolean
    caseId?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["todo"]>

  export type TodoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    dueAt?: boolean
    status?: boolean
    caseId?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["todo"]>

  export type TodoSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    dueAt?: boolean
    status?: boolean
    caseId?: boolean
    createdAt?: boolean
  }

  export type TodoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "dueAt" | "status" | "caseId" | "createdAt", ExtArgs["result"]["todo"]>
  export type TodoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type TodoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type TodoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }

  export type $TodoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Todo"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      dueAt: Date | null
      status: $Enums.TodoStatus
      caseId: string
      createdAt: Date
    }, ExtArgs["result"]["todo"]>
    composites: {}
  }

  type TodoGetPayload<S extends boolean | null | undefined | TodoDefaultArgs> = $Result.GetResult<Prisma.$TodoPayload, S>

  type TodoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TodoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TodoCountAggregateInputType | true
    }

  export interface TodoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Todo'], meta: { name: 'Todo' } }
    /**
     * Find zero or one Todo that matches the filter.
     * @param {TodoFindUniqueArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TodoFindUniqueArgs>(args: SelectSubset<T, TodoFindUniqueArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Todo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TodoFindUniqueOrThrowArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TodoFindUniqueOrThrowArgs>(args: SelectSubset<T, TodoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoFindFirstArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TodoFindFirstArgs>(args?: SelectSubset<T, TodoFindFirstArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoFindFirstOrThrowArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TodoFindFirstOrThrowArgs>(args?: SelectSubset<T, TodoFindFirstOrThrowArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Todos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Todos
     * const todos = await prisma.todo.findMany()
     * 
     * // Get first 10 Todos
     * const todos = await prisma.todo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const todoWithIdOnly = await prisma.todo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TodoFindManyArgs>(args?: SelectSubset<T, TodoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Todo.
     * @param {TodoCreateArgs} args - Arguments to create a Todo.
     * @example
     * // Create one Todo
     * const Todo = await prisma.todo.create({
     *   data: {
     *     // ... data to create a Todo
     *   }
     * })
     * 
     */
    create<T extends TodoCreateArgs>(args: SelectSubset<T, TodoCreateArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Todos.
     * @param {TodoCreateManyArgs} args - Arguments to create many Todos.
     * @example
     * // Create many Todos
     * const todo = await prisma.todo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TodoCreateManyArgs>(args?: SelectSubset<T, TodoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Todos and returns the data saved in the database.
     * @param {TodoCreateManyAndReturnArgs} args - Arguments to create many Todos.
     * @example
     * // Create many Todos
     * const todo = await prisma.todo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Todos and only return the `id`
     * const todoWithIdOnly = await prisma.todo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TodoCreateManyAndReturnArgs>(args?: SelectSubset<T, TodoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Todo.
     * @param {TodoDeleteArgs} args - Arguments to delete one Todo.
     * @example
     * // Delete one Todo
     * const Todo = await prisma.todo.delete({
     *   where: {
     *     // ... filter to delete one Todo
     *   }
     * })
     * 
     */
    delete<T extends TodoDeleteArgs>(args: SelectSubset<T, TodoDeleteArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Todo.
     * @param {TodoUpdateArgs} args - Arguments to update one Todo.
     * @example
     * // Update one Todo
     * const todo = await prisma.todo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TodoUpdateArgs>(args: SelectSubset<T, TodoUpdateArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Todos.
     * @param {TodoDeleteManyArgs} args - Arguments to filter Todos to delete.
     * @example
     * // Delete a few Todos
     * const { count } = await prisma.todo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TodoDeleteManyArgs>(args?: SelectSubset<T, TodoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Todos
     * const todo = await prisma.todo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TodoUpdateManyArgs>(args: SelectSubset<T, TodoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todos and returns the data updated in the database.
     * @param {TodoUpdateManyAndReturnArgs} args - Arguments to update many Todos.
     * @example
     * // Update many Todos
     * const todo = await prisma.todo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Todos and only return the `id`
     * const todoWithIdOnly = await prisma.todo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TodoUpdateManyAndReturnArgs>(args: SelectSubset<T, TodoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Todo.
     * @param {TodoUpsertArgs} args - Arguments to update or create a Todo.
     * @example
     * // Update or create a Todo
     * const todo = await prisma.todo.upsert({
     *   create: {
     *     // ... data to create a Todo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Todo we want to update
     *   }
     * })
     */
    upsert<T extends TodoUpsertArgs>(args: SelectSubset<T, TodoUpsertArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoCountArgs} args - Arguments to filter Todos to count.
     * @example
     * // Count the number of Todos
     * const count = await prisma.todo.count({
     *   where: {
     *     // ... the filter for the Todos we want to count
     *   }
     * })
    **/
    count<T extends TodoCountArgs>(
      args?: Subset<T, TodoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TodoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Todo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TodoAggregateArgs>(args: Subset<T, TodoAggregateArgs>): Prisma.PrismaPromise<GetTodoAggregateType<T>>

    /**
     * Group by Todo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TodoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TodoGroupByArgs['orderBy'] }
        : { orderBy?: TodoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TodoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTodoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Todo model
   */
  readonly fields: TodoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Todo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TodoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Todo model
   */
  interface TodoFieldRefs {
    readonly id: FieldRef<"Todo", 'String'>
    readonly title: FieldRef<"Todo", 'String'>
    readonly description: FieldRef<"Todo", 'String'>
    readonly dueAt: FieldRef<"Todo", 'DateTime'>
    readonly status: FieldRef<"Todo", 'TodoStatus'>
    readonly caseId: FieldRef<"Todo", 'String'>
    readonly createdAt: FieldRef<"Todo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Todo findUnique
   */
  export type TodoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo findUniqueOrThrow
   */
  export type TodoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo findFirst
   */
  export type TodoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Todos.
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Todos.
     */
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Todo findFirstOrThrow
   */
  export type TodoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Todos.
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Todos.
     */
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Todo findMany
   */
  export type TodoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    /**
     * Filter, which Todos to fetch.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Todos.
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Todo create
   */
  export type TodoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    /**
     * The data needed to create a Todo.
     */
    data: XOR<TodoCreateInput, TodoUncheckedCreateInput>
  }

  /**
   * Todo createMany
   */
  export type TodoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Todos.
     */
    data: TodoCreateManyInput | TodoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Todo createManyAndReturn
   */
  export type TodoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data used to create many Todos.
     */
    data: TodoCreateManyInput | TodoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Todo update
   */
  export type TodoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    /**
     * The data needed to update a Todo.
     */
    data: XOR<TodoUpdateInput, TodoUncheckedUpdateInput>
    /**
     * Choose, which Todo to update.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo updateMany
   */
  export type TodoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Todos.
     */
    data: XOR<TodoUpdateManyMutationInput, TodoUncheckedUpdateManyInput>
    /**
     * Filter which Todos to update
     */
    where?: TodoWhereInput
    /**
     * Limit how many Todos to update.
     */
    limit?: number
  }

  /**
   * Todo updateManyAndReturn
   */
  export type TodoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data used to update Todos.
     */
    data: XOR<TodoUpdateManyMutationInput, TodoUncheckedUpdateManyInput>
    /**
     * Filter which Todos to update
     */
    where?: TodoWhereInput
    /**
     * Limit how many Todos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Todo upsert
   */
  export type TodoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    /**
     * The filter to search for the Todo to update in case it exists.
     */
    where: TodoWhereUniqueInput
    /**
     * In case the Todo found by the `where` argument doesn't exist, create a new Todo with this data.
     */
    create: XOR<TodoCreateInput, TodoUncheckedCreateInput>
    /**
     * In case the Todo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TodoUpdateInput, TodoUncheckedUpdateInput>
  }

  /**
   * Todo delete
   */
  export type TodoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
    /**
     * Filter which Todo to delete.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo deleteMany
   */
  export type TodoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Todos to delete
     */
    where?: TodoWhereInput
    /**
     * Limit how many Todos to delete.
     */
    limit?: number
  }

  /**
   * Todo without action
   */
  export type TodoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TodoInclude<ExtArgs> | null
  }


  /**
   * Model LegalTerm
   */

  export type AggregateLegalTerm = {
    _count: LegalTermCountAggregateOutputType | null
    _min: LegalTermMinAggregateOutputType | null
    _max: LegalTermMaxAggregateOutputType | null
  }

  export type LegalTermMinAggregateOutputType = {
    id: string | null
    word: string | null
    description: string | null
    category: string | null
    source: string | null
    createdAt: Date | null
  }

  export type LegalTermMaxAggregateOutputType = {
    id: string | null
    word: string | null
    description: string | null
    category: string | null
    source: string | null
    createdAt: Date | null
  }

  export type LegalTermCountAggregateOutputType = {
    id: number
    word: number
    description: number
    usage: number
    category: number
    source: number
    createdAt: number
    _all: number
  }


  export type LegalTermMinAggregateInputType = {
    id?: true
    word?: true
    description?: true
    category?: true
    source?: true
    createdAt?: true
  }

  export type LegalTermMaxAggregateInputType = {
    id?: true
    word?: true
    description?: true
    category?: true
    source?: true
    createdAt?: true
  }

  export type LegalTermCountAggregateInputType = {
    id?: true
    word?: true
    description?: true
    usage?: true
    category?: true
    source?: true
    createdAt?: true
    _all?: true
  }

  export type LegalTermAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LegalTerm to aggregate.
     */
    where?: LegalTermWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LegalTerms to fetch.
     */
    orderBy?: LegalTermOrderByWithRelationInput | LegalTermOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LegalTermWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LegalTerms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LegalTerms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LegalTerms
    **/
    _count?: true | LegalTermCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LegalTermMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LegalTermMaxAggregateInputType
  }

  export type GetLegalTermAggregateType<T extends LegalTermAggregateArgs> = {
        [P in keyof T & keyof AggregateLegalTerm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLegalTerm[P]>
      : GetScalarType<T[P], AggregateLegalTerm[P]>
  }




  export type LegalTermGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LegalTermWhereInput
    orderBy?: LegalTermOrderByWithAggregationInput | LegalTermOrderByWithAggregationInput[]
    by: LegalTermScalarFieldEnum[] | LegalTermScalarFieldEnum
    having?: LegalTermScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LegalTermCountAggregateInputType | true
    _min?: LegalTermMinAggregateInputType
    _max?: LegalTermMaxAggregateInputType
  }

  export type LegalTermGroupByOutputType = {
    id: string
    word: string
    description: string
    usage: string[]
    category: string
    source: string | null
    createdAt: Date
    _count: LegalTermCountAggregateOutputType | null
    _min: LegalTermMinAggregateOutputType | null
    _max: LegalTermMaxAggregateOutputType | null
  }

  type GetLegalTermGroupByPayload<T extends LegalTermGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LegalTermGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LegalTermGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LegalTermGroupByOutputType[P]>
            : GetScalarType<T[P], LegalTermGroupByOutputType[P]>
        }
      >
    >


  export type LegalTermSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    word?: boolean
    description?: boolean
    usage?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["legalTerm"]>

  export type LegalTermSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    word?: boolean
    description?: boolean
    usage?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["legalTerm"]>

  export type LegalTermSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    word?: boolean
    description?: boolean
    usage?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["legalTerm"]>

  export type LegalTermSelectScalar = {
    id?: boolean
    word?: boolean
    description?: boolean
    usage?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
  }

  export type LegalTermOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "word" | "description" | "usage" | "category" | "source" | "createdAt", ExtArgs["result"]["legalTerm"]>

  export type $LegalTermPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LegalTerm"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      word: string
      description: string
      usage: string[]
      category: string
      source: string | null
      createdAt: Date
    }, ExtArgs["result"]["legalTerm"]>
    composites: {}
  }

  type LegalTermGetPayload<S extends boolean | null | undefined | LegalTermDefaultArgs> = $Result.GetResult<Prisma.$LegalTermPayload, S>

  type LegalTermCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LegalTermFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LegalTermCountAggregateInputType | true
    }

  export interface LegalTermDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LegalTerm'], meta: { name: 'LegalTerm' } }
    /**
     * Find zero or one LegalTerm that matches the filter.
     * @param {LegalTermFindUniqueArgs} args - Arguments to find a LegalTerm
     * @example
     * // Get one LegalTerm
     * const legalTerm = await prisma.legalTerm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LegalTermFindUniqueArgs>(args: SelectSubset<T, LegalTermFindUniqueArgs<ExtArgs>>): Prisma__LegalTermClient<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LegalTerm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LegalTermFindUniqueOrThrowArgs} args - Arguments to find a LegalTerm
     * @example
     * // Get one LegalTerm
     * const legalTerm = await prisma.legalTerm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LegalTermFindUniqueOrThrowArgs>(args: SelectSubset<T, LegalTermFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LegalTermClient<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LegalTerm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegalTermFindFirstArgs} args - Arguments to find a LegalTerm
     * @example
     * // Get one LegalTerm
     * const legalTerm = await prisma.legalTerm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LegalTermFindFirstArgs>(args?: SelectSubset<T, LegalTermFindFirstArgs<ExtArgs>>): Prisma__LegalTermClient<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LegalTerm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegalTermFindFirstOrThrowArgs} args - Arguments to find a LegalTerm
     * @example
     * // Get one LegalTerm
     * const legalTerm = await prisma.legalTerm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LegalTermFindFirstOrThrowArgs>(args?: SelectSubset<T, LegalTermFindFirstOrThrowArgs<ExtArgs>>): Prisma__LegalTermClient<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LegalTerms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegalTermFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LegalTerms
     * const legalTerms = await prisma.legalTerm.findMany()
     * 
     * // Get first 10 LegalTerms
     * const legalTerms = await prisma.legalTerm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const legalTermWithIdOnly = await prisma.legalTerm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LegalTermFindManyArgs>(args?: SelectSubset<T, LegalTermFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LegalTerm.
     * @param {LegalTermCreateArgs} args - Arguments to create a LegalTerm.
     * @example
     * // Create one LegalTerm
     * const LegalTerm = await prisma.legalTerm.create({
     *   data: {
     *     // ... data to create a LegalTerm
     *   }
     * })
     * 
     */
    create<T extends LegalTermCreateArgs>(args: SelectSubset<T, LegalTermCreateArgs<ExtArgs>>): Prisma__LegalTermClient<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LegalTerms.
     * @param {LegalTermCreateManyArgs} args - Arguments to create many LegalTerms.
     * @example
     * // Create many LegalTerms
     * const legalTerm = await prisma.legalTerm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LegalTermCreateManyArgs>(args?: SelectSubset<T, LegalTermCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LegalTerms and returns the data saved in the database.
     * @param {LegalTermCreateManyAndReturnArgs} args - Arguments to create many LegalTerms.
     * @example
     * // Create many LegalTerms
     * const legalTerm = await prisma.legalTerm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LegalTerms and only return the `id`
     * const legalTermWithIdOnly = await prisma.legalTerm.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LegalTermCreateManyAndReturnArgs>(args?: SelectSubset<T, LegalTermCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LegalTerm.
     * @param {LegalTermDeleteArgs} args - Arguments to delete one LegalTerm.
     * @example
     * // Delete one LegalTerm
     * const LegalTerm = await prisma.legalTerm.delete({
     *   where: {
     *     // ... filter to delete one LegalTerm
     *   }
     * })
     * 
     */
    delete<T extends LegalTermDeleteArgs>(args: SelectSubset<T, LegalTermDeleteArgs<ExtArgs>>): Prisma__LegalTermClient<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LegalTerm.
     * @param {LegalTermUpdateArgs} args - Arguments to update one LegalTerm.
     * @example
     * // Update one LegalTerm
     * const legalTerm = await prisma.legalTerm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LegalTermUpdateArgs>(args: SelectSubset<T, LegalTermUpdateArgs<ExtArgs>>): Prisma__LegalTermClient<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LegalTerms.
     * @param {LegalTermDeleteManyArgs} args - Arguments to filter LegalTerms to delete.
     * @example
     * // Delete a few LegalTerms
     * const { count } = await prisma.legalTerm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LegalTermDeleteManyArgs>(args?: SelectSubset<T, LegalTermDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LegalTerms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegalTermUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LegalTerms
     * const legalTerm = await prisma.legalTerm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LegalTermUpdateManyArgs>(args: SelectSubset<T, LegalTermUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LegalTerms and returns the data updated in the database.
     * @param {LegalTermUpdateManyAndReturnArgs} args - Arguments to update many LegalTerms.
     * @example
     * // Update many LegalTerms
     * const legalTerm = await prisma.legalTerm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LegalTerms and only return the `id`
     * const legalTermWithIdOnly = await prisma.legalTerm.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LegalTermUpdateManyAndReturnArgs>(args: SelectSubset<T, LegalTermUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LegalTerm.
     * @param {LegalTermUpsertArgs} args - Arguments to update or create a LegalTerm.
     * @example
     * // Update or create a LegalTerm
     * const legalTerm = await prisma.legalTerm.upsert({
     *   create: {
     *     // ... data to create a LegalTerm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LegalTerm we want to update
     *   }
     * })
     */
    upsert<T extends LegalTermUpsertArgs>(args: SelectSubset<T, LegalTermUpsertArgs<ExtArgs>>): Prisma__LegalTermClient<$Result.GetResult<Prisma.$LegalTermPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LegalTerms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegalTermCountArgs} args - Arguments to filter LegalTerms to count.
     * @example
     * // Count the number of LegalTerms
     * const count = await prisma.legalTerm.count({
     *   where: {
     *     // ... the filter for the LegalTerms we want to count
     *   }
     * })
    **/
    count<T extends LegalTermCountArgs>(
      args?: Subset<T, LegalTermCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LegalTermCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LegalTerm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegalTermAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LegalTermAggregateArgs>(args: Subset<T, LegalTermAggregateArgs>): Prisma.PrismaPromise<GetLegalTermAggregateType<T>>

    /**
     * Group by LegalTerm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegalTermGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LegalTermGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LegalTermGroupByArgs['orderBy'] }
        : { orderBy?: LegalTermGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LegalTermGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLegalTermGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LegalTerm model
   */
  readonly fields: LegalTermFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LegalTerm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LegalTermClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LegalTerm model
   */
  interface LegalTermFieldRefs {
    readonly id: FieldRef<"LegalTerm", 'String'>
    readonly word: FieldRef<"LegalTerm", 'String'>
    readonly description: FieldRef<"LegalTerm", 'String'>
    readonly usage: FieldRef<"LegalTerm", 'String[]'>
    readonly category: FieldRef<"LegalTerm", 'String'>
    readonly source: FieldRef<"LegalTerm", 'String'>
    readonly createdAt: FieldRef<"LegalTerm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LegalTerm findUnique
   */
  export type LegalTermFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * Filter, which LegalTerm to fetch.
     */
    where: LegalTermWhereUniqueInput
  }

  /**
   * LegalTerm findUniqueOrThrow
   */
  export type LegalTermFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * Filter, which LegalTerm to fetch.
     */
    where: LegalTermWhereUniqueInput
  }

  /**
   * LegalTerm findFirst
   */
  export type LegalTermFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * Filter, which LegalTerm to fetch.
     */
    where?: LegalTermWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LegalTerms to fetch.
     */
    orderBy?: LegalTermOrderByWithRelationInput | LegalTermOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LegalTerms.
     */
    cursor?: LegalTermWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LegalTerms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LegalTerms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LegalTerms.
     */
    distinct?: LegalTermScalarFieldEnum | LegalTermScalarFieldEnum[]
  }

  /**
   * LegalTerm findFirstOrThrow
   */
  export type LegalTermFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * Filter, which LegalTerm to fetch.
     */
    where?: LegalTermWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LegalTerms to fetch.
     */
    orderBy?: LegalTermOrderByWithRelationInput | LegalTermOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LegalTerms.
     */
    cursor?: LegalTermWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LegalTerms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LegalTerms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LegalTerms.
     */
    distinct?: LegalTermScalarFieldEnum | LegalTermScalarFieldEnum[]
  }

  /**
   * LegalTerm findMany
   */
  export type LegalTermFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * Filter, which LegalTerms to fetch.
     */
    where?: LegalTermWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LegalTerms to fetch.
     */
    orderBy?: LegalTermOrderByWithRelationInput | LegalTermOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LegalTerms.
     */
    cursor?: LegalTermWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LegalTerms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LegalTerms.
     */
    skip?: number
    distinct?: LegalTermScalarFieldEnum | LegalTermScalarFieldEnum[]
  }

  /**
   * LegalTerm create
   */
  export type LegalTermCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * The data needed to create a LegalTerm.
     */
    data: XOR<LegalTermCreateInput, LegalTermUncheckedCreateInput>
  }

  /**
   * LegalTerm createMany
   */
  export type LegalTermCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LegalTerms.
     */
    data: LegalTermCreateManyInput | LegalTermCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LegalTerm createManyAndReturn
   */
  export type LegalTermCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * The data used to create many LegalTerms.
     */
    data: LegalTermCreateManyInput | LegalTermCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LegalTerm update
   */
  export type LegalTermUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * The data needed to update a LegalTerm.
     */
    data: XOR<LegalTermUpdateInput, LegalTermUncheckedUpdateInput>
    /**
     * Choose, which LegalTerm to update.
     */
    where: LegalTermWhereUniqueInput
  }

  /**
   * LegalTerm updateMany
   */
  export type LegalTermUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LegalTerms.
     */
    data: XOR<LegalTermUpdateManyMutationInput, LegalTermUncheckedUpdateManyInput>
    /**
     * Filter which LegalTerms to update
     */
    where?: LegalTermWhereInput
    /**
     * Limit how many LegalTerms to update.
     */
    limit?: number
  }

  /**
   * LegalTerm updateManyAndReturn
   */
  export type LegalTermUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * The data used to update LegalTerms.
     */
    data: XOR<LegalTermUpdateManyMutationInput, LegalTermUncheckedUpdateManyInput>
    /**
     * Filter which LegalTerms to update
     */
    where?: LegalTermWhereInput
    /**
     * Limit how many LegalTerms to update.
     */
    limit?: number
  }

  /**
   * LegalTerm upsert
   */
  export type LegalTermUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * The filter to search for the LegalTerm to update in case it exists.
     */
    where: LegalTermWhereUniqueInput
    /**
     * In case the LegalTerm found by the `where` argument doesn't exist, create a new LegalTerm with this data.
     */
    create: XOR<LegalTermCreateInput, LegalTermUncheckedCreateInput>
    /**
     * In case the LegalTerm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LegalTermUpdateInput, LegalTermUncheckedUpdateInput>
  }

  /**
   * LegalTerm delete
   */
  export type LegalTermDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
    /**
     * Filter which LegalTerm to delete.
     */
    where: LegalTermWhereUniqueInput
  }

  /**
   * LegalTerm deleteMany
   */
  export type LegalTermDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LegalTerms to delete
     */
    where?: LegalTermWhereInput
    /**
     * Limit how many LegalTerms to delete.
     */
    limit?: number
  }

  /**
   * LegalTerm without action
   */
  export type LegalTermDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegalTerm
     */
    select?: LegalTermSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegalTerm
     */
    omit?: LegalTermOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    profession: 'profession',
    legalKnowledge: 'legalKnowledge',
    jailTimeYears: 'jailTimeYears',
    warningSeverity: 'warningSeverity',
    pendingCaseType: 'pendingCaseType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CaseScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    status: 'status',
    opponent: 'opponent',
    timeline: 'timeline',
    evidence: 'evidence',
    agreement: 'agreement',
    impact: 'impact',
    intent: 'intent',
    involvedLaws: 'involvedLaws',
    finalAnalysis: 'finalAnalysis',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CaseScalarFieldEnum = (typeof CaseScalarFieldEnum)[keyof typeof CaseScalarFieldEnum]


  export const ExtractedDocScalarFieldEnum: {
    id: 'id',
    docId: 'docId',
    title: 'title',
    caseId: 'caseId',
    rawContent: 'rawContent',
    aiSummary: 'aiSummary',
    createdAt: 'createdAt'
  };

  export type ExtractedDocScalarFieldEnum = (typeof ExtractedDocScalarFieldEnum)[keyof typeof ExtractedDocScalarFieldEnum]


  export const TodoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    dueAt: 'dueAt',
    status: 'status',
    caseId: 'caseId',
    createdAt: 'createdAt'
  };

  export type TodoScalarFieldEnum = (typeof TodoScalarFieldEnum)[keyof typeof TodoScalarFieldEnum]


  export const LegalTermScalarFieldEnum: {
    id: 'id',
    word: 'word',
    description: 'description',
    usage: 'usage',
    category: 'category',
    source: 'source',
    createdAt: 'createdAt'
  };

  export type LegalTermScalarFieldEnum = (typeof LegalTermScalarFieldEnum)[keyof typeof LegalTermScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'LegalKnowledge'
   */
  export type EnumLegalKnowledgeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LegalKnowledge'>
    


  /**
   * Reference to a field of type 'LegalKnowledge[]'
   */
  export type ListEnumLegalKnowledgeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LegalKnowledge[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CaseStatus'
   */
  export type EnumCaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseStatus'>
    


  /**
   * Reference to a field of type 'CaseStatus[]'
   */
  export type ListEnumCaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'TodoStatus'
   */
  export type EnumTodoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TodoStatus'>
    


  /**
   * Reference to a field of type 'TodoStatus[]'
   */
  export type ListEnumTodoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TodoStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    profession?: StringNullableFilter<"User"> | string | null
    legalKnowledge?: EnumLegalKnowledgeFilter<"User"> | $Enums.LegalKnowledge
    jailTimeYears?: IntNullableFilter<"User"> | number | null
    warningSeverity?: StringNullableFilter<"User"> | string | null
    pendingCaseType?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    cases?: CaseListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    profession?: SortOrderInput | SortOrder
    legalKnowledge?: SortOrder
    jailTimeYears?: SortOrderInput | SortOrder
    warningSeverity?: SortOrderInput | SortOrder
    pendingCaseType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cases?: CaseOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    profession?: StringNullableFilter<"User"> | string | null
    legalKnowledge?: EnumLegalKnowledgeFilter<"User"> | $Enums.LegalKnowledge
    jailTimeYears?: IntNullableFilter<"User"> | number | null
    warningSeverity?: StringNullableFilter<"User"> | string | null
    pendingCaseType?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    cases?: CaseListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    profession?: SortOrderInput | SortOrder
    legalKnowledge?: SortOrder
    jailTimeYears?: SortOrderInput | SortOrder
    warningSeverity?: SortOrderInput | SortOrder
    pendingCaseType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    profession?: StringNullableWithAggregatesFilter<"User"> | string | null
    legalKnowledge?: EnumLegalKnowledgeWithAggregatesFilter<"User"> | $Enums.LegalKnowledge
    jailTimeYears?: IntNullableWithAggregatesFilter<"User"> | number | null
    warningSeverity?: StringNullableWithAggregatesFilter<"User"> | string | null
    pendingCaseType?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CaseWhereInput = {
    AND?: CaseWhereInput | CaseWhereInput[]
    OR?: CaseWhereInput[]
    NOT?: CaseWhereInput | CaseWhereInput[]
    id?: StringFilter<"Case"> | string
    userId?: StringFilter<"Case"> | string
    title?: StringFilter<"Case"> | string
    description?: StringFilter<"Case"> | string
    status?: EnumCaseStatusFilter<"Case"> | $Enums.CaseStatus
    opponent?: StringNullableFilter<"Case"> | string | null
    timeline?: StringNullableListFilter<"Case">
    evidence?: BoolFilter<"Case"> | boolean
    agreement?: BoolFilter<"Case"> | boolean
    impact?: StringNullableFilter<"Case"> | string | null
    intent?: StringNullableFilter<"Case"> | string | null
    involvedLaws?: StringNullableListFilter<"Case">
    finalAnalysis?: StringNullableFilter<"Case"> | string | null
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    todos?: TodoListRelationFilter
    extractedDocs?: ExtractedDocListRelationFilter
  }

  export type CaseOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    opponent?: SortOrderInput | SortOrder
    timeline?: SortOrder
    evidence?: SortOrder
    agreement?: SortOrder
    impact?: SortOrderInput | SortOrder
    intent?: SortOrderInput | SortOrder
    involvedLaws?: SortOrder
    finalAnalysis?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    todos?: TodoOrderByRelationAggregateInput
    extractedDocs?: ExtractedDocOrderByRelationAggregateInput
  }

  export type CaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseWhereInput | CaseWhereInput[]
    OR?: CaseWhereInput[]
    NOT?: CaseWhereInput | CaseWhereInput[]
    userId?: StringFilter<"Case"> | string
    title?: StringFilter<"Case"> | string
    description?: StringFilter<"Case"> | string
    status?: EnumCaseStatusFilter<"Case"> | $Enums.CaseStatus
    opponent?: StringNullableFilter<"Case"> | string | null
    timeline?: StringNullableListFilter<"Case">
    evidence?: BoolFilter<"Case"> | boolean
    agreement?: BoolFilter<"Case"> | boolean
    impact?: StringNullableFilter<"Case"> | string | null
    intent?: StringNullableFilter<"Case"> | string | null
    involvedLaws?: StringNullableListFilter<"Case">
    finalAnalysis?: StringNullableFilter<"Case"> | string | null
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    todos?: TodoListRelationFilter
    extractedDocs?: ExtractedDocListRelationFilter
  }, "id">

  export type CaseOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    opponent?: SortOrderInput | SortOrder
    timeline?: SortOrder
    evidence?: SortOrder
    agreement?: SortOrder
    impact?: SortOrderInput | SortOrder
    intent?: SortOrderInput | SortOrder
    involvedLaws?: SortOrder
    finalAnalysis?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CaseCountOrderByAggregateInput
    _max?: CaseMaxOrderByAggregateInput
    _min?: CaseMinOrderByAggregateInput
  }

  export type CaseScalarWhereWithAggregatesInput = {
    AND?: CaseScalarWhereWithAggregatesInput | CaseScalarWhereWithAggregatesInput[]
    OR?: CaseScalarWhereWithAggregatesInput[]
    NOT?: CaseScalarWhereWithAggregatesInput | CaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Case"> | string
    userId?: StringWithAggregatesFilter<"Case"> | string
    title?: StringWithAggregatesFilter<"Case"> | string
    description?: StringWithAggregatesFilter<"Case"> | string
    status?: EnumCaseStatusWithAggregatesFilter<"Case"> | $Enums.CaseStatus
    opponent?: StringNullableWithAggregatesFilter<"Case"> | string | null
    timeline?: StringNullableListFilter<"Case">
    evidence?: BoolWithAggregatesFilter<"Case"> | boolean
    agreement?: BoolWithAggregatesFilter<"Case"> | boolean
    impact?: StringNullableWithAggregatesFilter<"Case"> | string | null
    intent?: StringNullableWithAggregatesFilter<"Case"> | string | null
    involvedLaws?: StringNullableListFilter<"Case">
    finalAnalysis?: StringNullableWithAggregatesFilter<"Case"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
  }

  export type ExtractedDocWhereInput = {
    AND?: ExtractedDocWhereInput | ExtractedDocWhereInput[]
    OR?: ExtractedDocWhereInput[]
    NOT?: ExtractedDocWhereInput | ExtractedDocWhereInput[]
    id?: StringFilter<"ExtractedDoc"> | string
    docId?: StringFilter<"ExtractedDoc"> | string
    title?: StringFilter<"ExtractedDoc"> | string
    caseId?: StringFilter<"ExtractedDoc"> | string
    rawContent?: StringFilter<"ExtractedDoc"> | string
    aiSummary?: StringFilter<"ExtractedDoc"> | string
    createdAt?: DateTimeFilter<"ExtractedDoc"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }

  export type ExtractedDocOrderByWithRelationInput = {
    id?: SortOrder
    docId?: SortOrder
    title?: SortOrder
    caseId?: SortOrder
    rawContent?: SortOrder
    aiSummary?: SortOrder
    createdAt?: SortOrder
    case?: CaseOrderByWithRelationInput
  }

  export type ExtractedDocWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    docId?: string
    AND?: ExtractedDocWhereInput | ExtractedDocWhereInput[]
    OR?: ExtractedDocWhereInput[]
    NOT?: ExtractedDocWhereInput | ExtractedDocWhereInput[]
    title?: StringFilter<"ExtractedDoc"> | string
    caseId?: StringFilter<"ExtractedDoc"> | string
    rawContent?: StringFilter<"ExtractedDoc"> | string
    aiSummary?: StringFilter<"ExtractedDoc"> | string
    createdAt?: DateTimeFilter<"ExtractedDoc"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }, "id" | "docId">

  export type ExtractedDocOrderByWithAggregationInput = {
    id?: SortOrder
    docId?: SortOrder
    title?: SortOrder
    caseId?: SortOrder
    rawContent?: SortOrder
    aiSummary?: SortOrder
    createdAt?: SortOrder
    _count?: ExtractedDocCountOrderByAggregateInput
    _max?: ExtractedDocMaxOrderByAggregateInput
    _min?: ExtractedDocMinOrderByAggregateInput
  }

  export type ExtractedDocScalarWhereWithAggregatesInput = {
    AND?: ExtractedDocScalarWhereWithAggregatesInput | ExtractedDocScalarWhereWithAggregatesInput[]
    OR?: ExtractedDocScalarWhereWithAggregatesInput[]
    NOT?: ExtractedDocScalarWhereWithAggregatesInput | ExtractedDocScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExtractedDoc"> | string
    docId?: StringWithAggregatesFilter<"ExtractedDoc"> | string
    title?: StringWithAggregatesFilter<"ExtractedDoc"> | string
    caseId?: StringWithAggregatesFilter<"ExtractedDoc"> | string
    rawContent?: StringWithAggregatesFilter<"ExtractedDoc"> | string
    aiSummary?: StringWithAggregatesFilter<"ExtractedDoc"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ExtractedDoc"> | Date | string
  }

  export type TodoWhereInput = {
    AND?: TodoWhereInput | TodoWhereInput[]
    OR?: TodoWhereInput[]
    NOT?: TodoWhereInput | TodoWhereInput[]
    id?: StringFilter<"Todo"> | string
    title?: StringFilter<"Todo"> | string
    description?: StringNullableFilter<"Todo"> | string | null
    dueAt?: DateTimeNullableFilter<"Todo"> | Date | string | null
    status?: EnumTodoStatusFilter<"Todo"> | $Enums.TodoStatus
    caseId?: StringFilter<"Todo"> | string
    createdAt?: DateTimeFilter<"Todo"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }

  export type TodoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    dueAt?: SortOrderInput | SortOrder
    status?: SortOrder
    caseId?: SortOrder
    createdAt?: SortOrder
    case?: CaseOrderByWithRelationInput
  }

  export type TodoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TodoWhereInput | TodoWhereInput[]
    OR?: TodoWhereInput[]
    NOT?: TodoWhereInput | TodoWhereInput[]
    title?: StringFilter<"Todo"> | string
    description?: StringNullableFilter<"Todo"> | string | null
    dueAt?: DateTimeNullableFilter<"Todo"> | Date | string | null
    status?: EnumTodoStatusFilter<"Todo"> | $Enums.TodoStatus
    caseId?: StringFilter<"Todo"> | string
    createdAt?: DateTimeFilter<"Todo"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }, "id">

  export type TodoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    dueAt?: SortOrderInput | SortOrder
    status?: SortOrder
    caseId?: SortOrder
    createdAt?: SortOrder
    _count?: TodoCountOrderByAggregateInput
    _max?: TodoMaxOrderByAggregateInput
    _min?: TodoMinOrderByAggregateInput
  }

  export type TodoScalarWhereWithAggregatesInput = {
    AND?: TodoScalarWhereWithAggregatesInput | TodoScalarWhereWithAggregatesInput[]
    OR?: TodoScalarWhereWithAggregatesInput[]
    NOT?: TodoScalarWhereWithAggregatesInput | TodoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Todo"> | string
    title?: StringWithAggregatesFilter<"Todo"> | string
    description?: StringNullableWithAggregatesFilter<"Todo"> | string | null
    dueAt?: DateTimeNullableWithAggregatesFilter<"Todo"> | Date | string | null
    status?: EnumTodoStatusWithAggregatesFilter<"Todo"> | $Enums.TodoStatus
    caseId?: StringWithAggregatesFilter<"Todo"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Todo"> | Date | string
  }

  export type LegalTermWhereInput = {
    AND?: LegalTermWhereInput | LegalTermWhereInput[]
    OR?: LegalTermWhereInput[]
    NOT?: LegalTermWhereInput | LegalTermWhereInput[]
    id?: StringFilter<"LegalTerm"> | string
    word?: StringFilter<"LegalTerm"> | string
    description?: StringFilter<"LegalTerm"> | string
    usage?: StringNullableListFilter<"LegalTerm">
    category?: StringFilter<"LegalTerm"> | string
    source?: StringNullableFilter<"LegalTerm"> | string | null
    createdAt?: DateTimeFilter<"LegalTerm"> | Date | string
  }

  export type LegalTermOrderByWithRelationInput = {
    id?: SortOrder
    word?: SortOrder
    description?: SortOrder
    usage?: SortOrder
    category?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type LegalTermWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    word?: string
    AND?: LegalTermWhereInput | LegalTermWhereInput[]
    OR?: LegalTermWhereInput[]
    NOT?: LegalTermWhereInput | LegalTermWhereInput[]
    description?: StringFilter<"LegalTerm"> | string
    usage?: StringNullableListFilter<"LegalTerm">
    category?: StringFilter<"LegalTerm"> | string
    source?: StringNullableFilter<"LegalTerm"> | string | null
    createdAt?: DateTimeFilter<"LegalTerm"> | Date | string
  }, "id" | "word">

  export type LegalTermOrderByWithAggregationInput = {
    id?: SortOrder
    word?: SortOrder
    description?: SortOrder
    usage?: SortOrder
    category?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LegalTermCountOrderByAggregateInput
    _max?: LegalTermMaxOrderByAggregateInput
    _min?: LegalTermMinOrderByAggregateInput
  }

  export type LegalTermScalarWhereWithAggregatesInput = {
    AND?: LegalTermScalarWhereWithAggregatesInput | LegalTermScalarWhereWithAggregatesInput[]
    OR?: LegalTermScalarWhereWithAggregatesInput[]
    NOT?: LegalTermScalarWhereWithAggregatesInput | LegalTermScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LegalTerm"> | string
    word?: StringWithAggregatesFilter<"LegalTerm"> | string
    description?: StringWithAggregatesFilter<"LegalTerm"> | string
    usage?: StringNullableListFilter<"LegalTerm">
    category?: StringWithAggregatesFilter<"LegalTerm"> | string
    source?: StringNullableWithAggregatesFilter<"LegalTerm"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LegalTerm"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    profession?: string | null
    legalKnowledge: $Enums.LegalKnowledge
    jailTimeYears?: number | null
    warningSeverity?: string | null
    pendingCaseType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    profession?: string | null
    legalKnowledge: $Enums.LegalKnowledge
    jailTimeYears?: number | null
    warningSeverity?: string | null
    pendingCaseType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    legalKnowledge?: EnumLegalKnowledgeFieldUpdateOperationsInput | $Enums.LegalKnowledge
    jailTimeYears?: NullableIntFieldUpdateOperationsInput | number | null
    warningSeverity?: NullableStringFieldUpdateOperationsInput | string | null
    pendingCaseType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    legalKnowledge?: EnumLegalKnowledgeFieldUpdateOperationsInput | $Enums.LegalKnowledge
    jailTimeYears?: NullableIntFieldUpdateOperationsInput | number | null
    warningSeverity?: NullableStringFieldUpdateOperationsInput | string | null
    pendingCaseType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    profession?: string | null
    legalKnowledge: $Enums.LegalKnowledge
    jailTimeYears?: number | null
    warningSeverity?: string | null
    pendingCaseType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    legalKnowledge?: EnumLegalKnowledgeFieldUpdateOperationsInput | $Enums.LegalKnowledge
    jailTimeYears?: NullableIntFieldUpdateOperationsInput | number | null
    warningSeverity?: NullableStringFieldUpdateOperationsInput | string | null
    pendingCaseType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    legalKnowledge?: EnumLegalKnowledgeFieldUpdateOperationsInput | $Enums.LegalKnowledge
    jailTimeYears?: NullableIntFieldUpdateOperationsInput | number | null
    warningSeverity?: NullableStringFieldUpdateOperationsInput | string | null
    pendingCaseType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCreateInput = {
    id?: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCasesInput
    todos?: TodoCreateNestedManyWithoutCaseInput
    extractedDocs?: ExtractedDocCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    todos?: TodoUncheckedCreateNestedManyWithoutCaseInput
    extractedDocs?: ExtractedDocUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCasesNestedInput
    todos?: TodoUpdateManyWithoutCaseNestedInput
    extractedDocs?: ExtractedDocUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    todos?: TodoUncheckedUpdateManyWithoutCaseNestedInput
    extractedDocs?: ExtractedDocUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateManyInput = {
    id?: string
    userId: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractedDocCreateInput = {
    id?: string
    docId: string
    title: string
    rawContent: string
    aiSummary: string
    createdAt?: Date | string
    case: CaseCreateNestedOneWithoutExtractedDocsInput
  }

  export type ExtractedDocUncheckedCreateInput = {
    id?: string
    docId: string
    title: string
    caseId: string
    rawContent: string
    aiSummary: string
    createdAt?: Date | string
  }

  export type ExtractedDocUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    docId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    aiSummary?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutExtractedDocsNestedInput
  }

  export type ExtractedDocUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    docId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    aiSummary?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractedDocCreateManyInput = {
    id?: string
    docId: string
    title: string
    caseId: string
    rawContent: string
    aiSummary: string
    createdAt?: Date | string
  }

  export type ExtractedDocUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    docId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    aiSummary?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractedDocUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    docId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    aiSummary?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoCreateInput = {
    id?: string
    title: string
    description?: string | null
    dueAt?: Date | string | null
    status?: $Enums.TodoStatus
    createdAt?: Date | string
    case: CaseCreateNestedOneWithoutTodosInput
  }

  export type TodoUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    dueAt?: Date | string | null
    status?: $Enums.TodoStatus
    caseId: string
    createdAt?: Date | string
  }

  export type TodoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutTodosNestedInput
  }

  export type TodoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    caseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    dueAt?: Date | string | null
    status?: $Enums.TodoStatus
    caseId: string
    createdAt?: Date | string
  }

  export type TodoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    caseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LegalTermCreateInput = {
    id?: string
    word: string
    description: string
    usage?: LegalTermCreateusageInput | string[]
    category: string
    source?: string | null
    createdAt?: Date | string
  }

  export type LegalTermUncheckedCreateInput = {
    id?: string
    word: string
    description: string
    usage?: LegalTermCreateusageInput | string[]
    category: string
    source?: string | null
    createdAt?: Date | string
  }

  export type LegalTermUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    usage?: LegalTermUpdateusageInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LegalTermUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    usage?: LegalTermUpdateusageInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LegalTermCreateManyInput = {
    id?: string
    word: string
    description: string
    usage?: LegalTermCreateusageInput | string[]
    category: string
    source?: string | null
    createdAt?: Date | string
  }

  export type LegalTermUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    usage?: LegalTermUpdateusageInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LegalTermUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    usage?: LegalTermUpdateusageInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumLegalKnowledgeFilter<$PrismaModel = never> = {
    equals?: $Enums.LegalKnowledge | EnumLegalKnowledgeFieldRefInput<$PrismaModel>
    in?: $Enums.LegalKnowledge[] | ListEnumLegalKnowledgeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LegalKnowledge[] | ListEnumLegalKnowledgeFieldRefInput<$PrismaModel>
    not?: NestedEnumLegalKnowledgeFilter<$PrismaModel> | $Enums.LegalKnowledge
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CaseListRelationFilter = {
    every?: CaseWhereInput
    some?: CaseWhereInput
    none?: CaseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    profession?: SortOrder
    legalKnowledge?: SortOrder
    jailTimeYears?: SortOrder
    warningSeverity?: SortOrder
    pendingCaseType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    jailTimeYears?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    profession?: SortOrder
    legalKnowledge?: SortOrder
    jailTimeYears?: SortOrder
    warningSeverity?: SortOrder
    pendingCaseType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    profession?: SortOrder
    legalKnowledge?: SortOrder
    jailTimeYears?: SortOrder
    warningSeverity?: SortOrder
    pendingCaseType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    jailTimeYears?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumLegalKnowledgeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LegalKnowledge | EnumLegalKnowledgeFieldRefInput<$PrismaModel>
    in?: $Enums.LegalKnowledge[] | ListEnumLegalKnowledgeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LegalKnowledge[] | ListEnumLegalKnowledgeFieldRefInput<$PrismaModel>
    not?: NestedEnumLegalKnowledgeWithAggregatesFilter<$PrismaModel> | $Enums.LegalKnowledge
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLegalKnowledgeFilter<$PrismaModel>
    _max?: NestedEnumLegalKnowledgeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumCaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusFilter<$PrismaModel> | $Enums.CaseStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TodoListRelationFilter = {
    every?: TodoWhereInput
    some?: TodoWhereInput
    none?: TodoWhereInput
  }

  export type ExtractedDocListRelationFilter = {
    every?: ExtractedDocWhereInput
    some?: ExtractedDocWhereInput
    none?: ExtractedDocWhereInput
  }

  export type TodoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExtractedDocOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    opponent?: SortOrder
    timeline?: SortOrder
    evidence?: SortOrder
    agreement?: SortOrder
    impact?: SortOrder
    intent?: SortOrder
    involvedLaws?: SortOrder
    finalAnalysis?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    opponent?: SortOrder
    evidence?: SortOrder
    agreement?: SortOrder
    impact?: SortOrder
    intent?: SortOrder
    finalAnalysis?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    opponent?: SortOrder
    evidence?: SortOrder
    agreement?: SortOrder
    impact?: SortOrder
    intent?: SortOrder
    finalAnalysis?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseStatusFilter<$PrismaModel>
    _max?: NestedEnumCaseStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CaseScalarRelationFilter = {
    is?: CaseWhereInput
    isNot?: CaseWhereInput
  }

  export type ExtractedDocCountOrderByAggregateInput = {
    id?: SortOrder
    docId?: SortOrder
    title?: SortOrder
    caseId?: SortOrder
    rawContent?: SortOrder
    aiSummary?: SortOrder
    createdAt?: SortOrder
  }

  export type ExtractedDocMaxOrderByAggregateInput = {
    id?: SortOrder
    docId?: SortOrder
    title?: SortOrder
    caseId?: SortOrder
    rawContent?: SortOrder
    aiSummary?: SortOrder
    createdAt?: SortOrder
  }

  export type ExtractedDocMinOrderByAggregateInput = {
    id?: SortOrder
    docId?: SortOrder
    title?: SortOrder
    caseId?: SortOrder
    rawContent?: SortOrder
    aiSummary?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumTodoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TodoStatus | EnumTodoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TodoStatus[] | ListEnumTodoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TodoStatus[] | ListEnumTodoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTodoStatusFilter<$PrismaModel> | $Enums.TodoStatus
  }

  export type TodoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueAt?: SortOrder
    status?: SortOrder
    caseId?: SortOrder
    createdAt?: SortOrder
  }

  export type TodoMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueAt?: SortOrder
    status?: SortOrder
    caseId?: SortOrder
    createdAt?: SortOrder
  }

  export type TodoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueAt?: SortOrder
    status?: SortOrder
    caseId?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTodoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TodoStatus | EnumTodoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TodoStatus[] | ListEnumTodoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TodoStatus[] | ListEnumTodoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTodoStatusWithAggregatesFilter<$PrismaModel> | $Enums.TodoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTodoStatusFilter<$PrismaModel>
    _max?: NestedEnumTodoStatusFilter<$PrismaModel>
  }

  export type LegalTermCountOrderByAggregateInput = {
    id?: SortOrder
    word?: SortOrder
    description?: SortOrder
    usage?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type LegalTermMaxOrderByAggregateInput = {
    id?: SortOrder
    word?: SortOrder
    description?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type LegalTermMinOrderByAggregateInput = {
    id?: SortOrder
    word?: SortOrder
    description?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseCreateNestedManyWithoutUserInput = {
    create?: XOR<CaseCreateWithoutUserInput, CaseUncheckedCreateWithoutUserInput> | CaseCreateWithoutUserInput[] | CaseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutUserInput | CaseCreateOrConnectWithoutUserInput[]
    createMany?: CaseCreateManyUserInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CaseCreateWithoutUserInput, CaseUncheckedCreateWithoutUserInput> | CaseCreateWithoutUserInput[] | CaseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutUserInput | CaseCreateOrConnectWithoutUserInput[]
    createMany?: CaseCreateManyUserInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumLegalKnowledgeFieldUpdateOperationsInput = {
    set?: $Enums.LegalKnowledge
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CaseUpdateManyWithoutUserNestedInput = {
    create?: XOR<CaseCreateWithoutUserInput, CaseUncheckedCreateWithoutUserInput> | CaseCreateWithoutUserInput[] | CaseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutUserInput | CaseCreateOrConnectWithoutUserInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutUserInput | CaseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CaseCreateManyUserInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutUserInput | CaseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutUserInput | CaseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CaseCreateWithoutUserInput, CaseUncheckedCreateWithoutUserInput> | CaseCreateWithoutUserInput[] | CaseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutUserInput | CaseCreateOrConnectWithoutUserInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutUserInput | CaseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CaseCreateManyUserInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutUserInput | CaseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutUserInput | CaseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseCreatetimelineInput = {
    set: string[]
  }

  export type CaseCreateinvolvedLawsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutCasesInput = {
    create?: XOR<UserCreateWithoutCasesInput, UserUncheckedCreateWithoutCasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCasesInput
    connect?: UserWhereUniqueInput
  }

  export type TodoCreateNestedManyWithoutCaseInput = {
    create?: XOR<TodoCreateWithoutCaseInput, TodoUncheckedCreateWithoutCaseInput> | TodoCreateWithoutCaseInput[] | TodoUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: TodoCreateOrConnectWithoutCaseInput | TodoCreateOrConnectWithoutCaseInput[]
    createMany?: TodoCreateManyCaseInputEnvelope
    connect?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
  }

  export type ExtractedDocCreateNestedManyWithoutCaseInput = {
    create?: XOR<ExtractedDocCreateWithoutCaseInput, ExtractedDocUncheckedCreateWithoutCaseInput> | ExtractedDocCreateWithoutCaseInput[] | ExtractedDocUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: ExtractedDocCreateOrConnectWithoutCaseInput | ExtractedDocCreateOrConnectWithoutCaseInput[]
    createMany?: ExtractedDocCreateManyCaseInputEnvelope
    connect?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
  }

  export type TodoUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<TodoCreateWithoutCaseInput, TodoUncheckedCreateWithoutCaseInput> | TodoCreateWithoutCaseInput[] | TodoUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: TodoCreateOrConnectWithoutCaseInput | TodoCreateOrConnectWithoutCaseInput[]
    createMany?: TodoCreateManyCaseInputEnvelope
    connect?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
  }

  export type ExtractedDocUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<ExtractedDocCreateWithoutCaseInput, ExtractedDocUncheckedCreateWithoutCaseInput> | ExtractedDocCreateWithoutCaseInput[] | ExtractedDocUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: ExtractedDocCreateOrConnectWithoutCaseInput | ExtractedDocCreateOrConnectWithoutCaseInput[]
    createMany?: ExtractedDocCreateManyCaseInputEnvelope
    connect?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
  }

  export type EnumCaseStatusFieldUpdateOperationsInput = {
    set?: $Enums.CaseStatus
  }

  export type CaseUpdatetimelineInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CaseUpdateinvolvedLawsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutCasesNestedInput = {
    create?: XOR<UserCreateWithoutCasesInput, UserUncheckedCreateWithoutCasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCasesInput
    upsert?: UserUpsertWithoutCasesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCasesInput, UserUpdateWithoutCasesInput>, UserUncheckedUpdateWithoutCasesInput>
  }

  export type TodoUpdateManyWithoutCaseNestedInput = {
    create?: XOR<TodoCreateWithoutCaseInput, TodoUncheckedCreateWithoutCaseInput> | TodoCreateWithoutCaseInput[] | TodoUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: TodoCreateOrConnectWithoutCaseInput | TodoCreateOrConnectWithoutCaseInput[]
    upsert?: TodoUpsertWithWhereUniqueWithoutCaseInput | TodoUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: TodoCreateManyCaseInputEnvelope
    set?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
    disconnect?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
    delete?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
    connect?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
    update?: TodoUpdateWithWhereUniqueWithoutCaseInput | TodoUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: TodoUpdateManyWithWhereWithoutCaseInput | TodoUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: TodoScalarWhereInput | TodoScalarWhereInput[]
  }

  export type ExtractedDocUpdateManyWithoutCaseNestedInput = {
    create?: XOR<ExtractedDocCreateWithoutCaseInput, ExtractedDocUncheckedCreateWithoutCaseInput> | ExtractedDocCreateWithoutCaseInput[] | ExtractedDocUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: ExtractedDocCreateOrConnectWithoutCaseInput | ExtractedDocCreateOrConnectWithoutCaseInput[]
    upsert?: ExtractedDocUpsertWithWhereUniqueWithoutCaseInput | ExtractedDocUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: ExtractedDocCreateManyCaseInputEnvelope
    set?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
    disconnect?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
    delete?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
    connect?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
    update?: ExtractedDocUpdateWithWhereUniqueWithoutCaseInput | ExtractedDocUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: ExtractedDocUpdateManyWithWhereWithoutCaseInput | ExtractedDocUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: ExtractedDocScalarWhereInput | ExtractedDocScalarWhereInput[]
  }

  export type TodoUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<TodoCreateWithoutCaseInput, TodoUncheckedCreateWithoutCaseInput> | TodoCreateWithoutCaseInput[] | TodoUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: TodoCreateOrConnectWithoutCaseInput | TodoCreateOrConnectWithoutCaseInput[]
    upsert?: TodoUpsertWithWhereUniqueWithoutCaseInput | TodoUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: TodoCreateManyCaseInputEnvelope
    set?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
    disconnect?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
    delete?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
    connect?: TodoWhereUniqueInput | TodoWhereUniqueInput[]
    update?: TodoUpdateWithWhereUniqueWithoutCaseInput | TodoUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: TodoUpdateManyWithWhereWithoutCaseInput | TodoUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: TodoScalarWhereInput | TodoScalarWhereInput[]
  }

  export type ExtractedDocUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<ExtractedDocCreateWithoutCaseInput, ExtractedDocUncheckedCreateWithoutCaseInput> | ExtractedDocCreateWithoutCaseInput[] | ExtractedDocUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: ExtractedDocCreateOrConnectWithoutCaseInput | ExtractedDocCreateOrConnectWithoutCaseInput[]
    upsert?: ExtractedDocUpsertWithWhereUniqueWithoutCaseInput | ExtractedDocUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: ExtractedDocCreateManyCaseInputEnvelope
    set?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
    disconnect?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
    delete?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
    connect?: ExtractedDocWhereUniqueInput | ExtractedDocWhereUniqueInput[]
    update?: ExtractedDocUpdateWithWhereUniqueWithoutCaseInput | ExtractedDocUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: ExtractedDocUpdateManyWithWhereWithoutCaseInput | ExtractedDocUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: ExtractedDocScalarWhereInput | ExtractedDocScalarWhereInput[]
  }

  export type CaseCreateNestedOneWithoutExtractedDocsInput = {
    create?: XOR<CaseCreateWithoutExtractedDocsInput, CaseUncheckedCreateWithoutExtractedDocsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutExtractedDocsInput
    connect?: CaseWhereUniqueInput
  }

  export type CaseUpdateOneRequiredWithoutExtractedDocsNestedInput = {
    create?: XOR<CaseCreateWithoutExtractedDocsInput, CaseUncheckedCreateWithoutExtractedDocsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutExtractedDocsInput
    upsert?: CaseUpsertWithoutExtractedDocsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutExtractedDocsInput, CaseUpdateWithoutExtractedDocsInput>, CaseUncheckedUpdateWithoutExtractedDocsInput>
  }

  export type CaseCreateNestedOneWithoutTodosInput = {
    create?: XOR<CaseCreateWithoutTodosInput, CaseUncheckedCreateWithoutTodosInput>
    connectOrCreate?: CaseCreateOrConnectWithoutTodosInput
    connect?: CaseWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumTodoStatusFieldUpdateOperationsInput = {
    set?: $Enums.TodoStatus
  }

  export type CaseUpdateOneRequiredWithoutTodosNestedInput = {
    create?: XOR<CaseCreateWithoutTodosInput, CaseUncheckedCreateWithoutTodosInput>
    connectOrCreate?: CaseCreateOrConnectWithoutTodosInput
    upsert?: CaseUpsertWithoutTodosInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutTodosInput, CaseUpdateWithoutTodosInput>, CaseUncheckedUpdateWithoutTodosInput>
  }

  export type LegalTermCreateusageInput = {
    set: string[]
  }

  export type LegalTermUpdateusageInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumLegalKnowledgeFilter<$PrismaModel = never> = {
    equals?: $Enums.LegalKnowledge | EnumLegalKnowledgeFieldRefInput<$PrismaModel>
    in?: $Enums.LegalKnowledge[] | ListEnumLegalKnowledgeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LegalKnowledge[] | ListEnumLegalKnowledgeFieldRefInput<$PrismaModel>
    not?: NestedEnumLegalKnowledgeFilter<$PrismaModel> | $Enums.LegalKnowledge
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumLegalKnowledgeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LegalKnowledge | EnumLegalKnowledgeFieldRefInput<$PrismaModel>
    in?: $Enums.LegalKnowledge[] | ListEnumLegalKnowledgeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LegalKnowledge[] | ListEnumLegalKnowledgeFieldRefInput<$PrismaModel>
    not?: NestedEnumLegalKnowledgeWithAggregatesFilter<$PrismaModel> | $Enums.LegalKnowledge
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLegalKnowledgeFilter<$PrismaModel>
    _max?: NestedEnumLegalKnowledgeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusFilter<$PrismaModel> | $Enums.CaseStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumCaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseStatusFilter<$PrismaModel>
    _max?: NestedEnumCaseStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTodoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TodoStatus | EnumTodoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TodoStatus[] | ListEnumTodoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TodoStatus[] | ListEnumTodoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTodoStatusFilter<$PrismaModel> | $Enums.TodoStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTodoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TodoStatus | EnumTodoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TodoStatus[] | ListEnumTodoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TodoStatus[] | ListEnumTodoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTodoStatusWithAggregatesFilter<$PrismaModel> | $Enums.TodoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTodoStatusFilter<$PrismaModel>
    _max?: NestedEnumTodoStatusFilter<$PrismaModel>
  }

  export type CaseCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    todos?: TodoCreateNestedManyWithoutCaseInput
    extractedDocs?: ExtractedDocCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    todos?: TodoUncheckedCreateNestedManyWithoutCaseInput
    extractedDocs?: ExtractedDocUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutUserInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutUserInput, CaseUncheckedCreateWithoutUserInput>
  }

  export type CaseCreateManyUserInputEnvelope = {
    data: CaseCreateManyUserInput | CaseCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CaseUpsertWithWhereUniqueWithoutUserInput = {
    where: CaseWhereUniqueInput
    update: XOR<CaseUpdateWithoutUserInput, CaseUncheckedUpdateWithoutUserInput>
    create: XOR<CaseCreateWithoutUserInput, CaseUncheckedCreateWithoutUserInput>
  }

  export type CaseUpdateWithWhereUniqueWithoutUserInput = {
    where: CaseWhereUniqueInput
    data: XOR<CaseUpdateWithoutUserInput, CaseUncheckedUpdateWithoutUserInput>
  }

  export type CaseUpdateManyWithWhereWithoutUserInput = {
    where: CaseScalarWhereInput
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyWithoutUserInput>
  }

  export type CaseScalarWhereInput = {
    AND?: CaseScalarWhereInput | CaseScalarWhereInput[]
    OR?: CaseScalarWhereInput[]
    NOT?: CaseScalarWhereInput | CaseScalarWhereInput[]
    id?: StringFilter<"Case"> | string
    userId?: StringFilter<"Case"> | string
    title?: StringFilter<"Case"> | string
    description?: StringFilter<"Case"> | string
    status?: EnumCaseStatusFilter<"Case"> | $Enums.CaseStatus
    opponent?: StringNullableFilter<"Case"> | string | null
    timeline?: StringNullableListFilter<"Case">
    evidence?: BoolFilter<"Case"> | boolean
    agreement?: BoolFilter<"Case"> | boolean
    impact?: StringNullableFilter<"Case"> | string | null
    intent?: StringNullableFilter<"Case"> | string | null
    involvedLaws?: StringNullableListFilter<"Case">
    finalAnalysis?: StringNullableFilter<"Case"> | string | null
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
  }

  export type UserCreateWithoutCasesInput = {
    id?: string
    email: string
    name?: string | null
    profession?: string | null
    legalKnowledge: $Enums.LegalKnowledge
    jailTimeYears?: number | null
    warningSeverity?: string | null
    pendingCaseType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutCasesInput = {
    id?: string
    email: string
    name?: string | null
    profession?: string | null
    legalKnowledge: $Enums.LegalKnowledge
    jailTimeYears?: number | null
    warningSeverity?: string | null
    pendingCaseType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutCasesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCasesInput, UserUncheckedCreateWithoutCasesInput>
  }

  export type TodoCreateWithoutCaseInput = {
    id?: string
    title: string
    description?: string | null
    dueAt?: Date | string | null
    status?: $Enums.TodoStatus
    createdAt?: Date | string
  }

  export type TodoUncheckedCreateWithoutCaseInput = {
    id?: string
    title: string
    description?: string | null
    dueAt?: Date | string | null
    status?: $Enums.TodoStatus
    createdAt?: Date | string
  }

  export type TodoCreateOrConnectWithoutCaseInput = {
    where: TodoWhereUniqueInput
    create: XOR<TodoCreateWithoutCaseInput, TodoUncheckedCreateWithoutCaseInput>
  }

  export type TodoCreateManyCaseInputEnvelope = {
    data: TodoCreateManyCaseInput | TodoCreateManyCaseInput[]
    skipDuplicates?: boolean
  }

  export type ExtractedDocCreateWithoutCaseInput = {
    id?: string
    docId: string
    title: string
    rawContent: string
    aiSummary: string
    createdAt?: Date | string
  }

  export type ExtractedDocUncheckedCreateWithoutCaseInput = {
    id?: string
    docId: string
    title: string
    rawContent: string
    aiSummary: string
    createdAt?: Date | string
  }

  export type ExtractedDocCreateOrConnectWithoutCaseInput = {
    where: ExtractedDocWhereUniqueInput
    create: XOR<ExtractedDocCreateWithoutCaseInput, ExtractedDocUncheckedCreateWithoutCaseInput>
  }

  export type ExtractedDocCreateManyCaseInputEnvelope = {
    data: ExtractedDocCreateManyCaseInput | ExtractedDocCreateManyCaseInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCasesInput = {
    update: XOR<UserUpdateWithoutCasesInput, UserUncheckedUpdateWithoutCasesInput>
    create: XOR<UserCreateWithoutCasesInput, UserUncheckedCreateWithoutCasesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCasesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCasesInput, UserUncheckedUpdateWithoutCasesInput>
  }

  export type UserUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    legalKnowledge?: EnumLegalKnowledgeFieldUpdateOperationsInput | $Enums.LegalKnowledge
    jailTimeYears?: NullableIntFieldUpdateOperationsInput | number | null
    warningSeverity?: NullableStringFieldUpdateOperationsInput | string | null
    pendingCaseType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    legalKnowledge?: EnumLegalKnowledgeFieldUpdateOperationsInput | $Enums.LegalKnowledge
    jailTimeYears?: NullableIntFieldUpdateOperationsInput | number | null
    warningSeverity?: NullableStringFieldUpdateOperationsInput | string | null
    pendingCaseType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoUpsertWithWhereUniqueWithoutCaseInput = {
    where: TodoWhereUniqueInput
    update: XOR<TodoUpdateWithoutCaseInput, TodoUncheckedUpdateWithoutCaseInput>
    create: XOR<TodoCreateWithoutCaseInput, TodoUncheckedCreateWithoutCaseInput>
  }

  export type TodoUpdateWithWhereUniqueWithoutCaseInput = {
    where: TodoWhereUniqueInput
    data: XOR<TodoUpdateWithoutCaseInput, TodoUncheckedUpdateWithoutCaseInput>
  }

  export type TodoUpdateManyWithWhereWithoutCaseInput = {
    where: TodoScalarWhereInput
    data: XOR<TodoUpdateManyMutationInput, TodoUncheckedUpdateManyWithoutCaseInput>
  }

  export type TodoScalarWhereInput = {
    AND?: TodoScalarWhereInput | TodoScalarWhereInput[]
    OR?: TodoScalarWhereInput[]
    NOT?: TodoScalarWhereInput | TodoScalarWhereInput[]
    id?: StringFilter<"Todo"> | string
    title?: StringFilter<"Todo"> | string
    description?: StringNullableFilter<"Todo"> | string | null
    dueAt?: DateTimeNullableFilter<"Todo"> | Date | string | null
    status?: EnumTodoStatusFilter<"Todo"> | $Enums.TodoStatus
    caseId?: StringFilter<"Todo"> | string
    createdAt?: DateTimeFilter<"Todo"> | Date | string
  }

  export type ExtractedDocUpsertWithWhereUniqueWithoutCaseInput = {
    where: ExtractedDocWhereUniqueInput
    update: XOR<ExtractedDocUpdateWithoutCaseInput, ExtractedDocUncheckedUpdateWithoutCaseInput>
    create: XOR<ExtractedDocCreateWithoutCaseInput, ExtractedDocUncheckedCreateWithoutCaseInput>
  }

  export type ExtractedDocUpdateWithWhereUniqueWithoutCaseInput = {
    where: ExtractedDocWhereUniqueInput
    data: XOR<ExtractedDocUpdateWithoutCaseInput, ExtractedDocUncheckedUpdateWithoutCaseInput>
  }

  export type ExtractedDocUpdateManyWithWhereWithoutCaseInput = {
    where: ExtractedDocScalarWhereInput
    data: XOR<ExtractedDocUpdateManyMutationInput, ExtractedDocUncheckedUpdateManyWithoutCaseInput>
  }

  export type ExtractedDocScalarWhereInput = {
    AND?: ExtractedDocScalarWhereInput | ExtractedDocScalarWhereInput[]
    OR?: ExtractedDocScalarWhereInput[]
    NOT?: ExtractedDocScalarWhereInput | ExtractedDocScalarWhereInput[]
    id?: StringFilter<"ExtractedDoc"> | string
    docId?: StringFilter<"ExtractedDoc"> | string
    title?: StringFilter<"ExtractedDoc"> | string
    caseId?: StringFilter<"ExtractedDoc"> | string
    rawContent?: StringFilter<"ExtractedDoc"> | string
    aiSummary?: StringFilter<"ExtractedDoc"> | string
    createdAt?: DateTimeFilter<"ExtractedDoc"> | Date | string
  }

  export type CaseCreateWithoutExtractedDocsInput = {
    id?: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCasesInput
    todos?: TodoCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutExtractedDocsInput = {
    id?: string
    userId: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    todos?: TodoUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutExtractedDocsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutExtractedDocsInput, CaseUncheckedCreateWithoutExtractedDocsInput>
  }

  export type CaseUpsertWithoutExtractedDocsInput = {
    update: XOR<CaseUpdateWithoutExtractedDocsInput, CaseUncheckedUpdateWithoutExtractedDocsInput>
    create: XOR<CaseCreateWithoutExtractedDocsInput, CaseUncheckedCreateWithoutExtractedDocsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutExtractedDocsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutExtractedDocsInput, CaseUncheckedUpdateWithoutExtractedDocsInput>
  }

  export type CaseUpdateWithoutExtractedDocsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCasesNestedInput
    todos?: TodoUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutExtractedDocsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    todos?: TodoUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateWithoutTodosInput = {
    id?: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCasesInput
    extractedDocs?: ExtractedDocCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutTodosInput = {
    id?: string
    userId: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    extractedDocs?: ExtractedDocUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutTodosInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutTodosInput, CaseUncheckedCreateWithoutTodosInput>
  }

  export type CaseUpsertWithoutTodosInput = {
    update: XOR<CaseUpdateWithoutTodosInput, CaseUncheckedUpdateWithoutTodosInput>
    create: XOR<CaseCreateWithoutTodosInput, CaseUncheckedCreateWithoutTodosInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutTodosInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutTodosInput, CaseUncheckedUpdateWithoutTodosInput>
  }

  export type CaseUpdateWithoutTodosInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCasesNestedInput
    extractedDocs?: ExtractedDocUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutTodosInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractedDocs?: ExtractedDocUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateManyUserInput = {
    id?: string
    title: string
    description: string
    status?: $Enums.CaseStatus
    opponent?: string | null
    timeline?: CaseCreatetimelineInput | string[]
    evidence: boolean
    agreement: boolean
    impact?: string | null
    intent?: string | null
    involvedLaws?: CaseCreateinvolvedLawsInput | string[]
    finalAnalysis?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    todos?: TodoUpdateManyWithoutCaseNestedInput
    extractedDocs?: ExtractedDocUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    todos?: TodoUncheckedUpdateManyWithoutCaseNestedInput
    extractedDocs?: ExtractedDocUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: CaseUpdatetimelineInput | string[]
    evidence?: BoolFieldUpdateOperationsInput | boolean
    agreement?: BoolFieldUpdateOperationsInput | boolean
    impact?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    involvedLaws?: CaseUpdateinvolvedLawsInput | string[]
    finalAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoCreateManyCaseInput = {
    id?: string
    title: string
    description?: string | null
    dueAt?: Date | string | null
    status?: $Enums.TodoStatus
    createdAt?: Date | string
  }

  export type ExtractedDocCreateManyCaseInput = {
    id?: string
    docId: string
    title: string
    rawContent: string
    aiSummary: string
    createdAt?: Date | string
  }

  export type TodoUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTodoStatusFieldUpdateOperationsInput | $Enums.TodoStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractedDocUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    docId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    aiSummary?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractedDocUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    docId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    aiSummary?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractedDocUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    docId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    aiSummary?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
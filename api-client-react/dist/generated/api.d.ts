import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { ActivityItem, Booking, BookingInput, BookingUpdate, Business, BusinessInput, BusinessStats, BusinessUpdate, GenerateContentInput, GeneratedContent, HealthStatus, Lead, LeadInput, LeadUpdate, Template } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListBusinessesUrl: () => string;
/**
 * @summary List all businesses
 */
export declare const listBusinesses: (options?: RequestInit) => Promise<Business[]>;
export declare const getListBusinessesQueryKey: () => readonly ["/api/businesses"];
export declare const getListBusinessesQueryOptions: <TData = Awaited<ReturnType<typeof listBusinesses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBusinesses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBusinesses>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBusinessesQueryResult = NonNullable<Awaited<ReturnType<typeof listBusinesses>>>;
export type ListBusinessesQueryError = ErrorType<unknown>;
/**
 * @summary List all businesses
 */
export declare function useListBusinesses<TData = Awaited<ReturnType<typeof listBusinesses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBusinesses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateBusinessUrl: () => string;
/**
 * @summary Create a business
 */
export declare const createBusiness: (businessInput: BusinessInput, options?: RequestInit) => Promise<Business>;
export declare const getCreateBusinessMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBusiness>>, TError, {
        data: BodyType<BusinessInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createBusiness>>, TError, {
    data: BodyType<BusinessInput>;
}, TContext>;
export type CreateBusinessMutationResult = NonNullable<Awaited<ReturnType<typeof createBusiness>>>;
export type CreateBusinessMutationBody = BodyType<BusinessInput>;
export type CreateBusinessMutationError = ErrorType<unknown>;
/**
* @summary Create a business
*/
export declare const useCreateBusiness: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBusiness>>, TError, {
        data: BodyType<BusinessInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createBusiness>>, TError, {
    data: BodyType<BusinessInput>;
}, TContext>;
export declare const getGetBusinessUrl: (id: number) => string;
/**
 * @summary Get a business by ID
 */
export declare const getBusiness: (id: number, options?: RequestInit) => Promise<Business>;
export declare const getGetBusinessQueryKey: (id: number) => readonly [`/api/businesses/${number}`];
export declare const getGetBusinessQueryOptions: <TData = Awaited<ReturnType<typeof getBusiness>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBusiness>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getBusiness>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetBusinessQueryResult = NonNullable<Awaited<ReturnType<typeof getBusiness>>>;
export type GetBusinessQueryError = ErrorType<void>;
/**
 * @summary Get a business by ID
 */
export declare function useGetBusiness<TData = Awaited<ReturnType<typeof getBusiness>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBusiness>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateBusinessUrl: (id: number) => string;
/**
 * @summary Update a business
 */
export declare const updateBusiness: (id: number, businessUpdate: BusinessUpdate, options?: RequestInit) => Promise<Business>;
export declare const getUpdateBusinessMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBusiness>>, TError, {
        id: number;
        data: BodyType<BusinessUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateBusiness>>, TError, {
    id: number;
    data: BodyType<BusinessUpdate>;
}, TContext>;
export type UpdateBusinessMutationResult = NonNullable<Awaited<ReturnType<typeof updateBusiness>>>;
export type UpdateBusinessMutationBody = BodyType<BusinessUpdate>;
export type UpdateBusinessMutationError = ErrorType<unknown>;
/**
* @summary Update a business
*/
export declare const useUpdateBusiness: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBusiness>>, TError, {
        id: number;
        data: BodyType<BusinessUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateBusiness>>, TError, {
    id: number;
    data: BodyType<BusinessUpdate>;
}, TContext>;
export declare const getDeleteBusinessUrl: (id: number) => string;
/**
 * @summary Delete a business
 */
export declare const deleteBusiness: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteBusinessMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteBusiness>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteBusiness>>, TError, {
    id: number;
}, TContext>;
export type DeleteBusinessMutationResult = NonNullable<Awaited<ReturnType<typeof deleteBusiness>>>;
export type DeleteBusinessMutationError = ErrorType<unknown>;
/**
* @summary Delete a business
*/
export declare const useDeleteBusiness: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteBusiness>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteBusiness>>, TError, {
    id: number;
}, TContext>;
export declare const getGetBusinessStatsUrl: (id: number) => string;
/**
 * @summary Get dashboard statistics for a business
 */
export declare const getBusinessStats: (id: number, options?: RequestInit) => Promise<BusinessStats>;
export declare const getGetBusinessStatsQueryKey: (id: number) => readonly [`/api/businesses/${number}/stats`];
export declare const getGetBusinessStatsQueryOptions: <TData = Awaited<ReturnType<typeof getBusinessStats>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBusinessStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getBusinessStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetBusinessStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getBusinessStats>>>;
export type GetBusinessStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard statistics for a business
 */
export declare function useGetBusinessStats<TData = Awaited<ReturnType<typeof getBusinessStats>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBusinessStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetBusinessActivityUrl: (id: number) => string;
/**
 * @summary Get recent activity for a business
 */
export declare const getBusinessActivity: (id: number, options?: RequestInit) => Promise<ActivityItem[]>;
export declare const getGetBusinessActivityQueryKey: (id: number) => readonly [`/api/businesses/${number}/activity`];
export declare const getGetBusinessActivityQueryOptions: <TData = Awaited<ReturnType<typeof getBusinessActivity>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBusinessActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getBusinessActivity>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetBusinessActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getBusinessActivity>>>;
export type GetBusinessActivityQueryError = ErrorType<unknown>;
/**
 * @summary Get recent activity for a business
 */
export declare function useGetBusinessActivity<TData = Awaited<ReturnType<typeof getBusinessActivity>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBusinessActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListLeadsUrl: (id: number) => string;
/**
 * @summary List leads for a business
 */
export declare const listLeads: (id: number, options?: RequestInit) => Promise<Lead[]>;
export declare const getListLeadsQueryKey: (id: number) => readonly [`/api/businesses/${number}/leads`];
export declare const getListLeadsQueryOptions: <TData = Awaited<ReturnType<typeof listLeads>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLeads>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listLeads>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListLeadsQueryResult = NonNullable<Awaited<ReturnType<typeof listLeads>>>;
export type ListLeadsQueryError = ErrorType<unknown>;
/**
 * @summary List leads for a business
 */
export declare function useListLeads<TData = Awaited<ReturnType<typeof listLeads>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLeads>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateLeadUrl: (id: number) => string;
/**
 * @summary Create a lead
 */
export declare const createLead: (id: number, leadInput: LeadInput, options?: RequestInit) => Promise<Lead>;
export declare const getCreateLeadMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
        id: number;
        data: BodyType<LeadInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
    id: number;
    data: BodyType<LeadInput>;
}, TContext>;
export type CreateLeadMutationResult = NonNullable<Awaited<ReturnType<typeof createLead>>>;
export type CreateLeadMutationBody = BodyType<LeadInput>;
export type CreateLeadMutationError = ErrorType<unknown>;
/**
* @summary Create a lead
*/
export declare const useCreateLead: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
        id: number;
        data: BodyType<LeadInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createLead>>, TError, {
    id: number;
    data: BodyType<LeadInput>;
}, TContext>;
export declare const getUpdateLeadUrl: (id: number, leadId: number) => string;
/**
 * @summary Update a lead
 */
export declare const updateLead: (id: number, leadId: number, leadUpdate: LeadUpdate, options?: RequestInit) => Promise<Lead>;
export declare const getUpdateLeadMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLead>>, TError, {
        id: number;
        leadId: number;
        data: BodyType<LeadUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateLead>>, TError, {
    id: number;
    leadId: number;
    data: BodyType<LeadUpdate>;
}, TContext>;
export type UpdateLeadMutationResult = NonNullable<Awaited<ReturnType<typeof updateLead>>>;
export type UpdateLeadMutationBody = BodyType<LeadUpdate>;
export type UpdateLeadMutationError = ErrorType<unknown>;
/**
* @summary Update a lead
*/
export declare const useUpdateLead: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLead>>, TError, {
        id: number;
        leadId: number;
        data: BodyType<LeadUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateLead>>, TError, {
    id: number;
    leadId: number;
    data: BodyType<LeadUpdate>;
}, TContext>;
export declare const getDeleteLeadUrl: (id: number, leadId: number) => string;
/**
 * @summary Delete a lead
 */
export declare const deleteLead: (id: number, leadId: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteLeadMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteLead>>, TError, {
        id: number;
        leadId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteLead>>, TError, {
    id: number;
    leadId: number;
}, TContext>;
export type DeleteLeadMutationResult = NonNullable<Awaited<ReturnType<typeof deleteLead>>>;
export type DeleteLeadMutationError = ErrorType<unknown>;
/**
* @summary Delete a lead
*/
export declare const useDeleteLead: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteLead>>, TError, {
        id: number;
        leadId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteLead>>, TError, {
    id: number;
    leadId: number;
}, TContext>;
export declare const getListBookingsUrl: (id: number) => string;
/**
 * @summary List bookings for a business
 */
export declare const listBookings: (id: number, options?: RequestInit) => Promise<Booking[]>;
export declare const getListBookingsQueryKey: (id: number) => readonly [`/api/businesses/${number}/bookings`];
export declare const getListBookingsQueryOptions: <TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBookingsQueryResult = NonNullable<Awaited<ReturnType<typeof listBookings>>>;
export type ListBookingsQueryError = ErrorType<unknown>;
/**
 * @summary List bookings for a business
 */
export declare function useListBookings<TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateBookingUrl: (id: number) => string;
/**
 * @summary Create a booking
 */
export declare const createBooking: (id: number, bookingInput: BookingInput, options?: RequestInit) => Promise<Booking>;
export declare const getCreateBookingMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
        id: number;
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
    id: number;
    data: BodyType<BookingInput>;
}, TContext>;
export type CreateBookingMutationResult = NonNullable<Awaited<ReturnType<typeof createBooking>>>;
export type CreateBookingMutationBody = BodyType<BookingInput>;
export type CreateBookingMutationError = ErrorType<unknown>;
/**
* @summary Create a booking
*/
export declare const useCreateBooking: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
        id: number;
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createBooking>>, TError, {
    id: number;
    data: BodyType<BookingInput>;
}, TContext>;
export declare const getUpdateBookingUrl: (id: number, bookingId: number) => string;
/**
 * @summary Update a booking
 */
export declare const updateBooking: (id: number, bookingId: number, bookingUpdate: BookingUpdate, options?: RequestInit) => Promise<Booking>;
export declare const getUpdateBookingMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
        id: number;
        bookingId: number;
        data: BodyType<BookingUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
    id: number;
    bookingId: number;
    data: BodyType<BookingUpdate>;
}, TContext>;
export type UpdateBookingMutationResult = NonNullable<Awaited<ReturnType<typeof updateBooking>>>;
export type UpdateBookingMutationBody = BodyType<BookingUpdate>;
export type UpdateBookingMutationError = ErrorType<unknown>;
/**
* @summary Update a booking
*/
export declare const useUpdateBooking: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
        id: number;
        bookingId: number;
        data: BodyType<BookingUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateBooking>>, TError, {
    id: number;
    bookingId: number;
    data: BodyType<BookingUpdate>;
}, TContext>;
export declare const getListTemplatesUrl: () => string;
/**
 * @summary List available website templates
 */
export declare const listTemplates: (options?: RequestInit) => Promise<Template[]>;
export declare const getListTemplatesQueryKey: () => readonly ["/api/templates"];
export declare const getListTemplatesQueryOptions: <TData = Awaited<ReturnType<typeof listTemplates>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTemplates>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listTemplates>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListTemplatesQueryResult = NonNullable<Awaited<ReturnType<typeof listTemplates>>>;
export type ListTemplatesQueryError = ErrorType<unknown>;
/**
 * @summary List available website templates
 */
export declare function useListTemplates<TData = Awaited<ReturnType<typeof listTemplates>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTemplates>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGenerateContentUrl: () => string;
/**
 * @summary Generate AI content
 */
export declare const generateContent: (generateContentInput: GenerateContentInput, options?: RequestInit) => Promise<GeneratedContent>;
export declare const getGenerateContentMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateContent>>, TError, {
        data: BodyType<GenerateContentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof generateContent>>, TError, {
    data: BodyType<GenerateContentInput>;
}, TContext>;
export type GenerateContentMutationResult = NonNullable<Awaited<ReturnType<typeof generateContent>>>;
export type GenerateContentMutationBody = BodyType<GenerateContentInput>;
export type GenerateContentMutationError = ErrorType<unknown>;
/**
* @summary Generate AI content
*/
export declare const useGenerateContent: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateContent>>, TError, {
        data: BodyType<GenerateContentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof generateContent>>, TError, {
    data: BodyType<GenerateContentInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map
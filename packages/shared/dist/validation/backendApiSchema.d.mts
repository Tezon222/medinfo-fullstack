import { FallBackRouteSchemaKey } from "@zayne-labs/callapi/constants";
import { z } from "zod";

//#region src/validation/backendApiSchema.d.ts
declare const HealthTipSchema: z.ZodObject<{
  id: z.ZodString;
  imageAlt: z.ZodString;
  imageUrl: z.ZodString;
  lastUpdated: z.ZodString;
  mainContent: z.ZodArray<z.ZodObject<{
    content: z.ZodString;
    title: z.ZodString;
  }, z.core.$strip>>;
  title: z.ZodString;
}, z.core.$strip>;
declare const DiseaseSchema: z.ZodObject<{
  name: z.ZodString;
  description: z.ZodString;
  image: z.ZodURL;
  precautions: z.ZodArray<z.ZodString>;
  symptoms: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
declare const BaseSuccessResponseSchema: z.ZodObject<{
  data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
  message: z.ZodString;
  status: z.ZodLiteral<"success">;
}, z.core.$strip>;
declare const BaseErrorResponseSchema: z.ZodObject<{
  errors: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString>]>>, z.ZodUndefined]>;
  message: z.ZodString;
  status: z.ZodLiteral<"error">;
}, z.core.$strip>;
type BaseApiSuccessResponse<TData = z.infer<typeof BaseSuccessResponseSchema.shape.data>> = Omit<z.infer<typeof BaseSuccessResponseSchema>, "data"> & {
  data: TData;
};
type BaseApiErrorResponse<TErrors = z.infer<typeof BaseErrorResponseSchema>["errors"]> = Omit<z.infer<typeof BaseErrorResponseSchema>, "errors"> & {
  errors: TErrors;
};
declare const backendApiSchema: {
  config: {
    strict: true;
  };
  routes: {
    "@get/health-tips/all": {
      data: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
          id: z.ZodString;
          title: z.ZodString;
          imageAlt: z.ZodString;
          imageUrl: z.ZodString;
        }, z.core.$strip>>;
        message: z.ZodString;
        status: z.ZodLiteral<"success">;
      }, z.core.$strip>;
      query: z.ZodOptional<z.ZodObject<{
        limit: z.ZodOptional<z.ZodPipe<z.ZodTransform<string, any>, z.ZodTransform<number, string>>>;
      }, z.core.$strip>>;
    };
    "@get/health-tips/one/:id": {
      data: z.ZodObject<{
        data: z.ZodObject<{
          id: z.ZodString;
          imageAlt: z.ZodString;
          imageUrl: z.ZodString;
          lastUpdated: z.ZodString;
          mainContent: z.ZodArray<z.ZodObject<{
            content: z.ZodString;
            title: z.ZodString;
          }, z.core.$strip>>;
          title: z.ZodString;
        }, z.core.$strip>;
        message: z.ZodString;
        status: z.ZodLiteral<"success">;
      }, z.core.$strip>;
      params: z.ZodObject<{
        id: z.ZodString;
      }, z.core.$strip>;
    };
    "@delete/diseases/delete": {
      body: z.ZodObject<{
        name: z.ZodString;
      }, z.core.$strip>;
      data: z.ZodObject<{
        data: z.ZodNull;
        message: z.ZodString;
        status: z.ZodLiteral<"success">;
      }, z.core.$strip>;
    };
    "@get/diseases/all": {
      data: z.ZodObject<{
        data: z.ZodObject<{
          diseases: z.ZodArray<z.ZodObject<{
            description: z.ZodString;
            name: z.ZodString;
            image: z.ZodURL;
          }, z.core.$strip>>;
          limit: z.ZodNumber;
          page: z.ZodNumber;
          total: z.ZodNumber;
        }, z.core.$strip>;
        message: z.ZodString;
        status: z.ZodLiteral<"success">;
      }, z.core.$strip>;
      query: z.ZodOptional<z.ZodObject<{
        limit: z.ZodOptional<z.ZodPipe<z.ZodTransform<string, any>, z.ZodTransform<number, string>>>;
        page: z.ZodOptional<z.ZodPipe<z.ZodTransform<string, any>, z.ZodTransform<number, string>>>;
        random: z.ZodOptional<z.ZodPipe<z.ZodTransform<string, any>, z.ZodTransform<boolean | "unknown", string>>>;
      }, z.core.$strip>>;
    };
    "@get/diseases/one/:name": {
      data: z.ZodObject<{
        data: z.ZodObject<{
          name: z.ZodString;
          description: z.ZodString;
          image: z.ZodURL;
          precautions: z.ZodArray<z.ZodString>;
          symptoms: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
        message: z.ZodString;
        status: z.ZodLiteral<"success">;
      }, z.core.$strip>;
      params: z.ZodObject<{
        name: z.ZodString;
      }, z.core.$strip>;
    };
    "@patch/diseases/update": {
      body: z.ZodObject<{
        details: z.ZodObject<{
          name: z.ZodString;
          description: z.ZodString;
          image: z.ZodURL;
          precautions: z.ZodArray<z.ZodString>;
          symptoms: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
        name: z.ZodString;
      }, z.core.$strip>;
      data: z.ZodObject<{
        data: z.ZodObject<{
          name: z.ZodString;
          description: z.ZodString;
          image: z.ZodURL;
          precautions: z.ZodArray<z.ZodString>;
          symptoms: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
        message: z.ZodString;
        status: z.ZodLiteral<"success">;
      }, z.core.$strip>;
    };
    "@post/diseases/add": {
      body: z.ZodObject<{
        details: z.ZodObject<{
          name: z.ZodString;
          description: z.ZodString;
          image: z.ZodURL;
          precautions: z.ZodArray<z.ZodString>;
          symptoms: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
      }, z.core.$strip>;
      data: z.ZodObject<{
        data: z.ZodObject<{
          name: z.ZodString;
          description: z.ZodString;
          image: z.ZodURL;
          precautions: z.ZodArray<z.ZodString>;
          symptoms: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
        message: z.ZodString;
        status: z.ZodLiteral<"success">;
      }, z.core.$strip>;
    };
    "@default": {
      errorData: z.ZodObject<{
        errors: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString>]>>, z.ZodUndefined]>;
        message: z.ZodString;
        status: z.ZodLiteral<"error">;
      }, z.core.$strip>;
    };
  };
};
declare const backendApiSchemaRoutes: {
  "@get/health-tips/all": {
    data: z.ZodObject<{
      data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        imageAlt: z.ZodString;
        imageUrl: z.ZodString;
      }, z.core.$strip>>;
      message: z.ZodString;
      status: z.ZodLiteral<"success">;
    }, z.core.$strip>;
    query: z.ZodOptional<z.ZodObject<{
      limit: z.ZodOptional<z.ZodPipe<z.ZodTransform<string, any>, z.ZodTransform<number, string>>>;
    }, z.core.$strip>>;
  };
  "@get/health-tips/one/:id": {
    data: z.ZodObject<{
      data: z.ZodObject<{
        id: z.ZodString;
        imageAlt: z.ZodString;
        imageUrl: z.ZodString;
        lastUpdated: z.ZodString;
        mainContent: z.ZodArray<z.ZodObject<{
          content: z.ZodString;
          title: z.ZodString;
        }, z.core.$strip>>;
        title: z.ZodString;
      }, z.core.$strip>;
      message: z.ZodString;
      status: z.ZodLiteral<"success">;
    }, z.core.$strip>;
    params: z.ZodObject<{
      id: z.ZodString;
    }, z.core.$strip>;
  };
  "@delete/diseases/delete": {
    body: z.ZodObject<{
      name: z.ZodString;
    }, z.core.$strip>;
    data: z.ZodObject<{
      data: z.ZodNull;
      message: z.ZodString;
      status: z.ZodLiteral<"success">;
    }, z.core.$strip>;
  };
  "@get/diseases/all": {
    data: z.ZodObject<{
      data: z.ZodObject<{
        diseases: z.ZodArray<z.ZodObject<{
          description: z.ZodString;
          name: z.ZodString;
          image: z.ZodURL;
        }, z.core.$strip>>;
        limit: z.ZodNumber;
        page: z.ZodNumber;
        total: z.ZodNumber;
      }, z.core.$strip>;
      message: z.ZodString;
      status: z.ZodLiteral<"success">;
    }, z.core.$strip>;
    query: z.ZodOptional<z.ZodObject<{
      limit: z.ZodOptional<z.ZodPipe<z.ZodTransform<string, any>, z.ZodTransform<number, string>>>;
      page: z.ZodOptional<z.ZodPipe<z.ZodTransform<string, any>, z.ZodTransform<number, string>>>;
      random: z.ZodOptional<z.ZodPipe<z.ZodTransform<string, any>, z.ZodTransform<boolean | "unknown", string>>>;
    }, z.core.$strip>>;
  };
  "@get/diseases/one/:name": {
    data: z.ZodObject<{
      data: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        image: z.ZodURL;
        precautions: z.ZodArray<z.ZodString>;
        symptoms: z.ZodArray<z.ZodString>;
      }, z.core.$strip>;
      message: z.ZodString;
      status: z.ZodLiteral<"success">;
    }, z.core.$strip>;
    params: z.ZodObject<{
      name: z.ZodString;
    }, z.core.$strip>;
  };
  "@patch/diseases/update": {
    body: z.ZodObject<{
      details: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        image: z.ZodURL;
        precautions: z.ZodArray<z.ZodString>;
        symptoms: z.ZodArray<z.ZodString>;
      }, z.core.$strip>;
      name: z.ZodString;
    }, z.core.$strip>;
    data: z.ZodObject<{
      data: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        image: z.ZodURL;
        precautions: z.ZodArray<z.ZodString>;
        symptoms: z.ZodArray<z.ZodString>;
      }, z.core.$strip>;
      message: z.ZodString;
      status: z.ZodLiteral<"success">;
    }, z.core.$strip>;
  };
  "@post/diseases/add": {
    body: z.ZodObject<{
      details: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        image: z.ZodURL;
        precautions: z.ZodArray<z.ZodString>;
        symptoms: z.ZodArray<z.ZodString>;
      }, z.core.$strip>;
    }, z.core.$strip>;
    data: z.ZodObject<{
      data: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        image: z.ZodURL;
        precautions: z.ZodArray<z.ZodString>;
        symptoms: z.ZodArray<z.ZodString>;
      }, z.core.$strip>;
      message: z.ZodString;
      status: z.ZodLiteral<"success">;
    }, z.core.$strip>;
  };
  "@default": {
    errorData: z.ZodObject<{
      errors: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString>]>>, z.ZodUndefined]>;
      message: z.ZodString;
      status: z.ZodLiteral<"error">;
    }, z.core.$strip>;
  };
};
type RouteSchemaKeys = Exclude<keyof typeof backendApiSchemaRoutes, FallBackRouteSchemaKey>;
type BackendApiSchemaRoutes = Omit<typeof backendApiSchemaRoutes, FallBackRouteSchemaKey>;
type DiseaseSchemaType = z.infer<typeof DiseaseSchema>;
type HealthTipSchemaType = z.infer<typeof HealthTipSchema>;
//#endregion
export { BackendApiSchemaRoutes, BaseApiErrorResponse, BaseApiSuccessResponse, DiseaseSchemaType, HealthTipSchemaType, RouteSchemaKeys, backendApiSchema, backendApiSchemaRoutes };
//# sourceMappingURL=backendApiSchema.d.mts.map
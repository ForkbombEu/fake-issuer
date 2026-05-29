import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "../src/config.js";
import { credentialIssuerMetadata, credentialOffer } from "../src/metadata.js";
import type { JsonRecord } from "../src/types.js";

describe("metadata", () => {
  it("advertises credential scope in issuer metadata", () => {
    const metadata = credentialIssuerMetadata(DEFAULT_CONFIG) as JsonRecord;
    const configurations = metadata.credential_configurations_supported as JsonRecord;
    const configuration = configurations[DEFAULT_CONFIG.credential_configuration_id] as JsonRecord;

    expect(configuration.scope).toBe(DEFAULT_CONFIG.credential_scope);
  });

  it("does not put scope inside authorization_code credential offers", () => {
    const offer = credentialOffer(DEFAULT_CONFIG, "session-id") as JsonRecord;
    const grants = offer.grants as JsonRecord;
    const authorizationCode = grants.authorization_code as JsonRecord;

    expect(authorizationCode).toEqual({ issuer_state: "session-id" });
  });
});

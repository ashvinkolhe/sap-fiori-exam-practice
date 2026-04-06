export const STUDY_GUIDES = [
  {
    id: 'sg1',
    icon: '🎯',
    title: 'How to Answer Roleplay Scenarios',
    color: 'blue',
    description: 'Master the AREA framework for structuring answers in the new exam format.',
    sections: [
      {
        heading: 'The AREA Answer Framework',
        content: `Structure EVERY answer with these four components:

A — Architecture Decision: State WHAT you would choose
R — Reasoning: Explain WHY this is the right choice
E — Exact Steps: Name the specific tools, APIs, and configuration
A — Alternative: Mention what you considered and rejected

Example question: "Which floor plan would you use for browsing 50,000 purchase orders?"
A: "I would choose List Report Page + Object Page"
R: "because LR provides the Smart Filter Bar for complex filtering of large datasets, and OP provides the detail/edit view"
E: "using @UI.lineItem for table columns, @UI.selectionField for filter bar, @UI.headerInfo for the OP header, configured in manifest.json routing"
A: "I considered Worklist but rejected it because Worklist has no filter bar, which is essential with 50,000 records"`,
      },
      {
        heading: 'Floor Plan Quick-Pick Decision Tree',
        content: `Browse large dataset + complex filtering + edit individual records
→ List Report Page + Object Page

KPI cards, multiple data sources, executive dashboard
→ Overview Page

Chart + visual filters + table below, analytical drill-down
→ Analytical List Page (ALP)

Task list, no filtering needed, work through items
→ Worklist

Mix of standard Fiori elements + custom controls
→ Flexible Programming Model (FPM) — requires OData V4`,
      },
      {
        heading: 'The Open-Book Advantage',
        content: `C_FIORD_2601 is open-book. Use this strategically:

✓ Keep SAP Help documentation open: help.sap.com/ui5
✓ Keep the SAP Fiori Design Guidelines open: experience.sap.com/fiori-design-web
✓ Keep a copy of the CDS annotation vocabulary

The exam tests JUDGEMENT and REASONING, not memorisation.
You won't be asked to recall the exact syntax of an annotation —
you'll be asked WHY you'd use it and HOW it affects the app.`,
      },
      {
        heading: 'Common Exam Traps',
        content: `TRAP 1: "Copy the standard app" — ALWAYS wrong. Answer: controller extensions.

TRAP 2: OData V2 for new development — ALWAYS wrong. Answer: OData V4.

TRAP 3: Static tile for live KPI — ALWAYS wrong. Answer: Dynamic tile.

TRAP 4: Worklist with filter bar — contradiction. Worklist has NO filter bar.

TRAP 5: @UI.modelModifications in manifest — doesn't exist.

TRAP 6: Frontend security (hiding buttons) = real security — WRONG. Backend auth objects are always required.`,
      },
    ],
  },
  {
    id: 'sg2',
    icon: '🏷️',
    title: 'CDS Annotations Complete Reference',
    color: 'violet',
    description: 'Every annotation you need to know, organized by use case.',
    sections: [
      {
        heading: 'List Report Page Annotations',
        content: `@UI.lineItem: [{ position: 10, label: 'PO Number' }]
→ Adds field as TABLE COLUMN. position controls left-to-right order.

@UI.selectionField: [{ position: 10 }]
→ Adds field to SMART FILTER BAR. position controls filter order.

@UI.presentationVariant: { sortOrder: [{ Property: Date, Descending: true }] }
→ Controls DEFAULT SORT ORDER and visualisation in list.

@Search.defaultSearchElement: true
→ Adds field to BASIC SEARCH BAR (separate from Smart Filter Bar).

@UI.lineItem: [{ criticality: StatusCritField }]
→ ROW COLOUR CODING: 1=Red, 2=Amber, 3=Green.`,
      },
      {
        heading: 'Object Page Annotations',
        content: `@UI.headerInfo: { typeName: 'Sales Order', title: { Value: OrderID }, description: { Value: CustomerName } }
→ Object Page HEADER: type label, main title field, subtitle field.

@UI.facets: [{ $Type: 'UI.ReferenceFacet', Target: '_Group1/@UI.FieldGroup', Label: 'General' }]
→ Creates SECTIONS/TABS on Object Page. References fieldGroups.

@UI.fieldGroup: [{ Data: [{ Value: Field1 }, { Value: Field2 }] }]
→ Groups fields inside a section. Referenced by @UI.facets.

@UI.identification: [{ position: 10, Value: KeyField }]
→ Fields shown in header IDENTIFICATION area.

@UI.hidden: true
→ Hides field from ALL generated UI globally.`,
      },
      {
        heading: 'Analytical List Page (ALP) Annotations',
        content: `@Analytics.query: true  ← MANDATORY on CDS view
→ Enables analytical processing and aggregation.

@UI.chart: { chartType: #BAR, dimensions: [{ name: 'Region' }], measures: [{ name: 'Revenue' }] }
→ MANDATORY for chart section. Defines chart type, axes, values.
Chart types: #BAR, #LINE, #DONUT, #PIE, #BUBBLE, #SCATTER

@UI.lineItem: [{ position: 10 }]
→ Still needed for the TABLE section of ALP.

@UI.presentationVariant: { visualizations: ['@UI.chart', '@UI.lineItem'] }
→ Links chart and table sections together.

@UI.selectionPresentationVariant
→ Combines filter criteria + presentation settings.`,
      },
      {
        heading: 'Semantic & Service Annotations',
        content: `@Semantics.amount.currencyCode: 'CurrencyField'
→ Links amount to its currency. Auto-formats with locale currency.

@Semantics.quantity.unitOfMeasure: 'UnitField'
→ Links quantity to its unit of measure.

@OData.publish: true
→ Auto-generates OData V2 service for the CDS view.
(OData V4 → RAP service binding instead)

@UI.fieldControl: FieldControlCalculated
→ Dynamic field editability: 0=Hidden, 7=ReadOnly, 8=Editable.

@Aggregation.default: #SUM
→ Marks field as an aggregatable measure (needed for ALP).`,
      },
    ],
  },
  {
    id: 'sg3',
    icon: '🔌',
    title: 'Extensibility Patterns Cheat Sheet',
    color: 'emerald',
    description: 'Extension framework, manifest.json patterns, and upgrade-safe customisation.',
    sections: [
      {
        heading: 'The Extension Hierarchy',
        content: `LEVEL 1 — Annotations: Change what's displayed (add columns, filters)
  → Modify CDS view annotations or local annotation file

LEVEL 2 — UI Flexibility: Business users rename/reorder/hide at runtime
  → Adapt UI button (no developer or redeploy needed)

LEVEL 3 — Controller Extensions: Custom logic and event handlers
  → sap.ui.controllerExtensions in manifest.json

LEVEL 4 — Custom Fragments: Custom UI sections and actions
  → XML fragments + manifest.json extension points

LEVEL 5 — FPM: Mix standard building blocks + fully custom
  → Flexible Programming Model (requires OData V4)

LEVEL 6 — Freestyle: Completely custom (only when levels 1-5 insufficient)
  → Full SAPUI5 app development

Always use the lowest appropriate level!`,
      },
      {
        heading: 'manifest.json Extension Configuration',
        content: `VALID extension properties (only these two):
{
  "sap.ui5": {
    "extends": {
      "extensions": {
        "sap.ui.controllerExtensions": {
          "namespace.StandardController": {
            "controllerName": "my.namespace.CustomController"
          }
        },
        "sap.ui.viewModifications": {
          "namespace.StandardView": {
            "hideControl": ["controlId1", "controlId2"]
          }
        }
      }
    }
  }
}

INVALID (do not exist):
× sap.ui.modelModifications
× sap.ui.i18nModifications  
× sap.ui.serviceModifications`,
      },
      {
        heading: 'FPM Building Blocks Quick Reference',
        content: `XML namespace declaration:
xmlns:macros="sap.fe.macros"

Available building blocks:
<macros:Table metaPath="@com.sap.vocabularies.UI.v1.LineItem" id="myTable"/>
<macros:FilterBar metaPath="@com.sap.vocabularies.UI.v1.SelectionFields" id="myFB"/>
<macros:Field metaPath="OrderNumber" id="myField"/>
<macros:Chart metaPath="@com.sap.vocabularies.UI.v1.Chart" id="myChart"/>

Key rules:
• metaPath uses FULL vocabulary namespace (not shorthand @UI.LineItem)
• Requires OData V4 — will not work with OData V2
• Can be mixed freely with custom SAPUI5 controls in same view
• Auto-inherits SAP improvements without code changes`,
      },
      {
        heading: 'Extension Point Types',
        content: `Custom Column (table):
→ Add a developer-defined column to an existing table
→ Defined in manifest.json table configuration

Custom Section (Object Page):
→ Add a new section/tab to the Object Page
→ References a custom XML fragment

Custom Action (toolbar):
→ Add a button to table or page toolbar
→ manifest.json action config + controller extension handler

Custom Header Facet:
→ Replace or extend Object Page header area
→ Custom fragment with any controls (images, ratings, maps)

Key User Adaptation:
→ Runtime customisation by business users (no code)
→ Rename labels, reorder columns, hide fields`,
      },
    ],
  },
  {
    id: 'sg4',
    icon: '☁️',
    title: 'BTP Architecture & Connectivity',
    color: 'amber',
    description: 'SAP BTP services, Cloud Foundry deployment, and on-premise connectivity patterns.',
    sections: [
      {
        heading: 'BTP Connectivity Architecture',
        content: `BROWSER → BTP App Router (xs-app.json routes) → Destination Service → Cloud Connector tunnel → ON-PREMISE S/4HANA

Component responsibilities:
• App Router (xs-app.json): routes traffic, enforces authentication
• XSUAA: issues OAuth2 JWT tokens for user authentication
• Destination Service: maps logical destination names to real URLs
• Cloud Connector: creates secure outbound tunnel (no inbound needed)

Rules:
✓ Cloud Connector = installed on-premise, outbound tunnel to BTP
✓ Destination Service = configured in BTP Cockpit, points to CC virtual host
✓ BOTH are always required for on-premise connectivity
✗ Destination alone is NOT enough
✗ Cloud Connector alone is NOT enough`,
      },
      {
        heading: 'HTML5 App Repository Deployment',
        content: `Files needed for BTP CF deployment:
• manifest.json — app configuration
• xs-app.json — App Router routing rules
• mta.yaml — Multi-Target App deployment descriptor
• xs-security.json — XSUAA security config (scopes, roles)
• package.json — npm dependencies

Deployment steps:
1. npm run build (UI5 Tooling compresses/optimises)
2. mbt build (creates MTAR archive)
3. cf deploy *.mtar (deploys all modules to CF)

xs-app.json route example:
{ "source": "^/odata/(.*)", "target": "/odata/$1",
  "destination": "MY_S4_DESTINATION", "authenticationType": "xsuaa" }`,
      },
      {
        heading: 'XSUAA & Authorization',
        content: `XSUAA Flow:
1. User accesses app → redirected to Identity Provider login
2. IdP authenticates → issues SAML assertion
3. XSUAA exchanges SAML for OAuth2 JWT token
4. JWT token attached to all backend requests
5. Backend validates token via principal propagation

Key concepts:
• Scopes: fine-grained permissions in xs-security.json
• Roles: bundle multiple scopes (defined in xs-security.json)
• Role Collections: bundle multiple Roles (created in BTP Cockpit)
• Assignment: Role Collections assigned to Users in BTP Cockpit

Two auth layers always required:
(1) XSUAA Role Collections → BTP-level access
(2) PFCG roles in ABAP → backend-level authorization`,
      },
      {
        heading: 'SAP Launchpad Service Options',
        content: `Option 1: Native BTP Launchpad Service
→ Standard Fiori Launchpad on BTP
→ PFCG-equivalent role management via BTP roles
→ Best for: standard Fiori-only portals

Option 2: SAP Build Work Zone (Standard Edition)
→ Enhanced Launchpad + UI Integration Cards + workspaces
→ Aggregates content from multiple sources
→ Best for: complex enterprise portals

Option 3: SAP Build Work Zone (Advanced Edition)
→ Adds: Microsoft Teams/SharePoint integration
→ Business collaboration features
→ Best for: digital workplace scenarios

For new greenfield: Launchpad Service for simple, Build Work Zone for complex.`,
      },
    ],
  },
  {
    id: 'sg5',
    icon: '🧪',
    title: 'Testing Strategy Guide',
    color: 'rose',
    description: 'QUnit, OPA5, MockServer patterns and the SAPUI5 test pyramid.',
    sections: [
      {
        heading: 'The SAPUI5 Test Pyramid',
        content: `         /\\  OPA5 Integration Tests
        /  \\  (fewer, slower, test full flows)
       /    \\  
      /______\\  QUnit Unit Tests
     /        \\  (many, fast, test isolated functions)
    /          \\  
   /____________\\  MockServer Setup
  /              \\  (foundation — simulates backend for all tests)

QUnit: Tests single functions in isolation. Fast (milliseconds). Many tests.
OPA5: Tests user journeys and navigation flows. Slower. Fewer tests.  
MockServer: Not a test itself — enables both QUnit and OPA5 without a real backend.`,
      },
      {
        heading: 'QUnit Test Structure (AAA Pattern)',
        content: `QUnit.module('MainController', {
  beforeEach: function() {
    // ARRANGE: set up test environment
    this.oController = new MainController();
    this.oController.onInit();
    // Stub OData model if controller uses it
    this.oModel = { callFunction: sinon.stub() };
    sinon.stub(this.oController.getView(), 'getModel').returns(this.oModel);
  },
  afterEach: function() {
    // CLEANUP: always destroy controller
    this.oController.destroy();
    sinon.restore(); // restore all stubs
  }
});

QUnit.test('formatCurrency returns EUR format', function(assert) {
  // ACT: call the function being tested
  var result = this.oController.formatCurrency(1234.5, 'EUR');
  // ASSERT: verify the result
  assert.equal(result, '€1,234.50', 'EUR amount formatted correctly');
  assert.ok(result.includes('€'), 'Contains EUR symbol');
});`,
      },
      {
        heading: 'OPA5 Test Structure (Given-When-Then)',
        content: `// OPA5 Journey test for navigation
opaTest('Navigate from List to Object Page', function(Given, When, Then) {
  // GIVEN: app is in a specific state
  Given.iStartMyApp();
  
  // WHEN: user performs actions
  When.onTheListPage.iClickOnFirstRow();
  
  // THEN: expected result is verified
  Then.onTheObjectPage
    .iShouldSeeTheOrderNumber('PO-12345')
    .and.iShouldSeeTheApproveButton();
    
  Then.iTeardownMyApp();
});

// OPA5 uses waitFor() to handle async rendering
When.waitFor({
  id: 'approveBtn',
  actions: new Press(),
  success: function(oBtn) { Opa5.assert.ok(true, 'Button pressed'); }
});`,
      },
      {
        heading: 'MockServer Configuration',
        content: `// Initialize MockServer for testing
var oMockServer = new MockServer({
  rootUri: '/sap/opu/odata/sap/MY_SERVICE/'
});

MockServer.config({ autoRespond: true, autoRespondAfter: 0 });

oMockServer.simulate(
  './localService/metadata.xml',    // OData schema
  { sMockdataBaseUrl: './localService/mockdata/' }  // data files
);

oMockServer.start();

// File structure required:
// webapp/localService/metadata.xml
// webapp/localService/mockdata/EntitySetName.json

// Mock data file format:
// PurchaseOrders.json → [{"OrderID": "PO001", "Vendor": "SAP", ...}]

// ALWAYS start MockServer before any test runs
// ALWAYS stop MockServer in afterEach/after()`,
      },
    ],
  },
];

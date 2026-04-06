// 25+ Complete Model Answers for C_FIORD_2601 Scenario-Based Assessment
// These cover everything SAP tests in the new exam format

export const SAMPLE_ANSWERS = [
  {
    id:'sa1', category:'Floor Plans', icon:'🏗️',
    question:'A procurement manager needs to browse 80,000+ purchase orders with 15 filter criteria, then drill into individual POs to edit and approve them. Which floor plan?',
    tags:['List Report','Object Page','Transactional'],
    keyPoints:['Smart Filter Bar','Large dataset','Edit + approve workflow'],
    modelAnswer:`Floor Plan: List Report Page + Object Page (LR+OP)

WHY List Report Page?
The Smart Filter Bar handles 15+ filter fields efficiently. Server-side $top/$skip pagination handles 80,000 records without loading all data into the browser. The table adapts to the available columns via @UI.lineItem annotations.

WHY Object Page?
The Object Page delivers the full entity detail view, inline editing (draft-enabled), and action buttons (Approve/Reject) via OData V4 bound actions.

ANNOTATIONS NEEDED:
• @UI.lineItem — table columns in List Report
• @UI.selectionField — filter bar fields  
• @UI.headerInfo — Object Page header (PO number, vendor)
• @UI.facets + @UI.fieldGroup — Object Page sections (Line Items, Delivery Address)
• Bound actions in RAP behaviour definition (approvePO, rejectPO)

WHAT NOT TO CHOOSE:
• Worklist — has NO Smart Filter Bar (wrong for complex filtering)
• ALP — for analytics, not transactional editing
• Overview Page — for KPI dashboards, not list browsing`,
  },

  {
    id:'sa2', category:'Floor Plans', icon:'📊',
    question:'The Sales Director needs an executive dashboard showing Revenue, Open Orders, Expenses, Headcount, Budget Utilisation, and Customer Satisfaction — all on one screen with live data.',
    tags:['Overview Page','KPI','Dashboard'],
    keyPoints:['Multiple data sources','KPI cards','Executive view'],
    modelAnswer:`Floor Plan: Overview Page (OVP)

WHY Overview Page?
OVP is SAP's dedicated floor plan for multi-card dashboards. It supports heterogeneous data from different OData sources displayed as: KPI tiles (numeric KPIs), chart cards (bar/donut charts), table cards (lists), and link list cards. All cards on one screen, each connected to its own OData service.

CARD TYPES for this scenario:
• Revenue → KPI card with SmartChart trend indicator
• Open Orders → KPI card with Dynamic tile-style number
• Expenses → Chart card with bar chart (monthly trend)
• Headcount → KPI card
• Budget Utilisation → Chart card with donut chart showing used vs remaining
• Customer Satisfaction → KPI card with criticality colouring (green/amber/red)

ANNOTATIONS NEEDED (per card's CDS view):
• @UI.dataPoint — defines the KPI metric (value, criticality, trend)
• @UI.chart — for card types showing charts
• @UI.lineItem — for table card types

WHAT NOT TO CHOOSE:
• Analytical List Page — combines chart + table for ONE analytical dataset, not 6 different KPIs
• List Report — for browsing/filtering lists, not dashboards`,
  },

  {
    id:'sa3', category:'Floor Plans', icon:'🎯',
    question:'Warehouse workers process 200 inventory discrepancy items daily. They never filter — they just work through every item in the queue one by one. Which floor plan?',
    tags:['Worklist','Task-focused','No filter bar'],
    keyPoints:['No filtering needed','Process-oriented','Task queue'],
    modelAnswer:`Floor Plan: Worklist

WHY Worklist?
Worklist is SAP's floor plan for process-oriented task lists where users work through items sequentially without needing to filter or search. It intentionally omits the Smart Filter Bar — making the UI cleaner and faster for task workers who just need to see and action each item.

KEY DIFFERENTIATOR:
Worklist = task-focused, no Smart Filter Bar, work through all items
List Report = filter-focused, has Smart Filter Bar, browse large datasets

WHEN TO CHOOSE WORKLIST:
✓ Users never need to filter (they see all their assigned items)
✓ Process-oriented workflow (action each item)
✓ Smaller datasets (team-specific queues, not entire org datasets)
✓ "My Items" / "My Tasks" type apps

ANNOTATIONS:
• @UI.lineItem — columns in the Worklist table
• @UI.headerInfo — Object Page header for each item
• Same Object Page pattern as List Report — just the list view changes

WHAT NOT TO CHOOSE:
• List Report — correct if filtering was needed, wrong here (adds unnecessary Smart Filter Bar)
• ALP — analytical use case only`,
  },

  {
    id:'sa4', category:'Annotations', icon:'🏷️',
    question:'Explain the complete annotation structure needed for an Object Page with two sections: "General Info" (Name, DOB, Department) and "Financial Details" (Salary, Grade, Currency).',
    tags:['Object Page','fieldGroup','facets','Sections'],
    keyPoints:['@UI.facets','@UI.fieldGroup','ReferenceFacet','Sections'],
    modelAnswer:`Object Page section structure uses TWO annotations together:

STEP 1 — Define field groups (the content of each section):
@UI.fieldGroup #GeneralInfo: [
  { position: 10, Value: Name, Label: 'Full Name' },
  { position: 20, Value: DateOfBirth, Label: 'Date of Birth' },
  { position: 30, Value: Department, Label: 'Department' }
]

@UI.fieldGroup #FinancialDetails: [
  { position: 10, Value: Salary, Label: 'Annual Salary' },
  { position: 20, Value: Grade, Label: 'Grade' },
  { position: 30, Value: Currency, Label: 'Currency' }
]

STEP 2 — Define sections that reference the field groups:
@UI.facets: [
  {
    $Type: 'UI.ReferenceFacet',
    Target: '@UI.FieldGroup#GeneralInfo',
    Label: 'General Info',
    ID: 'GeneralFacet'
  },
  {
    $Type: 'UI.ReferenceFacet',
    Target: '@UI.FieldGroup#FinancialDetails',
    Label: 'Financial Details',
    ID: 'FinancialFacet'
  }
]

RESULT: Object Page shows two tabs/sections — General Info and Financial Details — each containing a form with the respective fields.

FOR A TABLE IN A SECTION (e.g., Line Items tab):
Use Target: '_LineItems/@UI.LineItem' — navigation path + annotation`,
  },

  {
    id:'sa5', category:'Annotations', icon:'📡',
    question:'An Analytical List Page (ALP) is not showing the chart. You have @UI.lineItem and @UI.selectionField. What additional annotations are required and why?',
    tags:['ALP','@Analytics.query','@UI.chart','Mandatory'],
    keyPoints:['@Analytics.query: true','@UI.chart','Aggregation annotations'],
    modelAnswer:`Two mandatory annotations are missing:

1. @Analytics.query: true (on the CDS VIEW HEADER)
Added to the CDS view declaration, not to any field.
Purpose: Tells the ABAP analytics engine this is an analytical query.
Enables: Server-side aggregation (SUM, COUNT, AVG) across dimensions.
Without it: The analytics engine doesn't process the view as aggregatable — @UI.chart has no data to work with.

2. @UI.chart (on the CDS view or a field group)
Defines the chart configuration:
@UI.chart: {
  chartType: #BAR,
  dimensions: [{ name: 'Region' }, { name: 'Month' }],
  measures: [{ name: 'Revenue' }]
}
Without it: ALP has no chart section to render.

ALSO NEEDED ON MEASURE FIELDS:
@Aggregation.default: #SUM on the Revenue field — marks it as aggregatable.

COMPLETE ALP ANNOTATION CHECKLIST:
✅ @Analytics.query: true — on CDS view header (MANDATORY)
✅ @Aggregation.default: #SUM — on measure fields
✅ @UI.chart — defines chart type/dimensions/measures (MANDATORY for chart)
✅ @UI.lineItem — defines table columns (needed for table section)
✅ @UI.selectionField — adds filter bar fields (you already have this)
✅ @UI.presentationVariant — optionally links chart and table`,
  },

  {
    id:'sa6', category:'BTP & Connectivity', icon:'☁️',
    question:'A new Fiori app on SAP BTP Cloud Foundry needs to connect to an on-premise SAP S/4HANA system. Describe the complete connectivity architecture.',
    tags:['BTP','Cloud Connector','Destination Service','Connectivity'],
    keyPoints:['Cloud Connector','Destination Service','xs-app.json','XSUAA'],
    modelAnswer:`Complete connectivity architecture — 4 components:

1. SAP CLOUD CONNECTOR (installed on-premise)
• Creates an outbound HTTPS tunnel from on-premise to BTP subaccount
• No inbound firewall rules needed — only outbound HTTPS (port 443)
• Maps internal system hostname/port to a "virtual host" (accessible from BTP)
• Download from SAP, install on any server in the on-premise network
• Configure: add the S/4HANA system as a "backend system" with internal + virtual host mapping

2. SAP DESTINATION SERVICE (configured in BTP Cockpit)
• Created in BTP Cockpit → Connectivity → Destinations
• Points to the Cloud Connector virtual host as the URL
• Contains: Name, URL (virtual host), Authentication type, ProxyType: OnPremise
• The app's manifest.json dataSources references this Destination name

3. SAP APPLICATION ROUTER + xs-app.json (app-level routing)
• xs-app.json defines routes that forward OData requests to named Destinations
• Example route:
  { "source": "^/odata/(.*)", "target": "/odata/$1",
    "destination": "MY_S4_DEST", "authenticationType": "xsuaa" }
• App Router handles: authentication enforcement, CSRF token forwarding, session management

4. XSUAA (authentication)
• Issues OAuth2 JWT tokens for user authentication
• Token forwarded to backend via Principal Propagation (user identity)
• Or technical user (simpler but loses audit trail)

REQUEST FLOW:
Browser → App Router (xs-app.json route match) → Destination Service → Cloud Connector → S/4HANA OData service`,
  },

  {
    id:'sa7', category:'BTP & Connectivity', icon:'🔐',
    question:'Explain XSUAA and its role in a Fiori application on SAP BTP. What is a Role Collection and how do users get access?',
    tags:['XSUAA','OAuth2','Role Collections','Security'],
    keyPoints:['OAuth2 JWT','Scopes','Role Collections','Assignment'],
    modelAnswer:`XSUAA (SAP Authorization and Trust Management Service) is the OAuth 2.0 authorization server on SAP BTP.

WHAT XSUAA DOES:
• Issues JWT (JSON Web Tokens) for authenticated users
• Defines Scopes (fine-grained permissions, e.g., "PO.Read", "PO.Approve")
• Manages trust with Identity Providers (corporate Azure AD, SAP IAS)
• Validates tokens on behalf of backend services

ROLE COLLECTION HIERARCHY:
Scope → Role → Role Collection → User

1. SCOPE (in xs-security.json):
Defined in the app's xs-security.json: { "name": "PO.Approve", "description": "Can approve purchase orders" }

2. ROLE (in xs-security.json):
Groups scopes: { "name": "PurchasingManager", "scope-references": ["PO.Read", "PO.Approve"] }

3. ROLE COLLECTION (in BTP Cockpit):
Groups Roles: "Procurement Power User" contains "PurchasingManager" + "VendorReader" roles

4. USER ASSIGNMENT (in BTP Cockpit):
Security → Users → select user → Assign Role Collection → "Procurement Power User"

ACCESS FLOW:
1. User logs in → redirected to Identity Provider
2. IdP authenticates → issues SAML assertion
3. XSUAA exchanges SAML for JWT token containing user's scopes
4. JWT attached to all OData requests
5. Backend validates JWT — if user has "PO.Approve" scope, action allowed

COMMON EXAM MISTAKE:
Creating Role Collections without assigning them to users — users then get 403 errors.`,
  },

  {
    id:'sa8', category:'Extensibility', icon:'🔧',
    question:'A company has copied the standard "Manage Purchase Orders" Fiori app and added 25 customisations over 18 months. SAP releases a critical security patch to the standard app. What happens and what should the company do?',
    tags:['Extensibility','Copy vs Extend','Upgrade Safety','Best Practice'],
    keyPoints:['No auto-updates','Manual patching','Migration strategy'],
    modelAnswer:`WHAT HAPPENS WITH THE COPY:
The security patch goes into SAP's standard app. The company's copy receives NO update — it remains on the old, vulnerable version indefinitely. The team must manually:
1. Review what SAP changed in the security patch
2. Apply the relevant changes to each of their 25 customisation areas
3. Retest the entire app

With 25 customisations, this could take 2-4 weeks of development work per SAP release. Over 18 months with quarterly releases = massive ongoing maintenance cost.

WHAT SHOULD HAVE BEEN DONE:
Use SAP's documented extension framework:
• sap.ui.controllerExtensions in manifest.json for controller logic
• Custom XML fragments for UI additions
• @UI annotations for display configuration

With extensions:
• Standard app receives security patches automatically
• Extension layer is isolated from standard code
• SAP guarantees extension points survive upgrades

MIGRATION STRATEGY (now that damage is done):
1. Inventory all 25 customisations — categorise each:
   - UI change → custom fragment/extension point
   - Logic change → controller extension
   - Display change → CDS annotation
2. Re-implement in priority order (security-critical first)
3. Test each extension before removing the corresponding copy modification
4. Switch back to standard app base once all customisations are re-implemented

EXAM KEY POINT: The exam will always mark "copy the standard app" as wrong. The extension framework is always the correct answer.`,
  },

  {
    id:'sa9', category:'Extensibility', icon:'🧩',
    question:'Explain the Flexible Programming Model (FPM). When would you choose it over standard Fiori elements, and what are the technical requirements?',
    tags:['FPM','Building Blocks','OData V4','Custom Sections'],
    keyPoints:['Mix standard + custom','OData V4 required','Macros namespace'],
    modelAnswer:`WHAT IS FPM:
The Flexible Programming Model (FPM) is SAP's approach for building apps that mix standard Fiori elements building blocks with custom SAPUI5 content. It bridges the gap between fully standard (Fiori elements) and fully custom (freestyle SAPUI5).

WHEN TO CHOOSE FPM:
Choose FPM when you need BOTH of these:
✓ Standard Fiori elements behaviour (table, filter bar, form)
AND
✓ Custom content that doesn't fit standard floor plans (maps, 3rd-party widgets, complex custom sections, unique visualisations)

TECHNICAL REQUIREMENTS:
1. OData V4 service (MANDATORY — building blocks do NOT work with V2)
2. ABAP RAP backend (recommended, provides native OData V4)
3. SAP Fiori Tools for scaffolding

HOW TO USE BUILDING BLOCKS in XML view:
<!-- Declare namespace -->
<mvc:View xmlns:macros="sap.fe.macros" ...>

  <!-- Standard Fiori elements table from annotation -->
  <macros:Table metaPath="@com.sap.vocabularies.UI.v1.LineItem" id="myTable"/>

  <!-- Standard filter bar -->
  <macros:FilterBar metaPath="@com.sap.vocabularies.UI.v1.SelectionFields" id="myFB"/>

  <!-- Custom 3rd-party content placed freely -->
  <my.custom:MapWidget id="deliveryMap" address="{DeliveryAddress}"/>

</mvc:View>

UPGRADE SAFETY:
Building blocks are SAP-maintained. They automatically inherit improvements in new SAPUI5 versions without any code changes — unlike custom freestyle controls.

EXAM MNEMONIC: FPM = OData V4 + macros namespace + mix anything`,
  },

  {
    id:'sa10', category:'Testing', icon:'🧪',
    question:'A developer is writing QUnit tests for a controller that calls an OData function. Write out the complete test structure using the Arrange-Act-Assert pattern.',
    tags:['QUnit','AAA Pattern','sinon stubs','Unit Testing'],
    keyPoints:['beforeEach','sinon.stub','Arrange-Act-Assert','afterEach cleanup'],
    modelAnswer:`Complete QUnit unit test with Arrange-Act-Assert:

QUnit.module('MainController Tests', {
  
  // ARRANGE: runs before EACH test
  beforeEach: function() {
    // 1. Create the controller under test
    this.oController = new MainController();
    this.oController.onInit();
    
    // 2. Create a mock OData model
    this.oMockModel = {
      callFunction: sinon.stub().returns({ success: true }),
      read: sinon.stub()
    };
    
    // 3. Stub the controller's getModel() to return our mock
    sinon.stub(this.oController.getView(), 'getModel')
      .withArgs('oData').returns(this.oMockModel);
  },

  // CLEANUP: runs after EACH test
  afterEach: function() {
    this.oController.destroy();
    sinon.restore(); // restore all stubs
  }
});

// TEST 1: Happy path
QUnit.test('onApprove calls OData function with correct PO number', function(assert) {
  // ACT
  this.oController.onApprove('PO-12345');
  
  // ASSERT
  assert.ok(
    this.oMockModel.callFunction.calledOnce,
    'callFunction called exactly once'
  );
  assert.ok(
    this.oMockModel.callFunction.calledWith('/ApprovePO', 
      sinon.match({ urlParameters: { PONumber: 'PO-12345' } })),
    'Called with correct PO number'
  );
});

// TEST 2: Formatter function
QUnit.test('formatStatus returns correct label for approved', function(assert) {
  const result = this.oController.formatStatus('APPROVED');
  assert.equal(result, 'Approved', 'Status formatted correctly');
});

// TEST 3: Error handling
QUnit.test('onApprove handles OData error gracefully', function(assert) {
  this.oMockModel.callFunction.callsArg(1); // trigger error callback
  const consoleSpy = sinon.spy(console, 'error');
  
  this.oController.onApprove('INVALID');
  
  assert.ok(consoleSpy.called, 'Error was logged');
});

KEY RULES:
• NEVER call real OData in unit tests — always stub
• ALWAYS clean up stubs in afterEach with sinon.restore()
• Test one thing per test function
• "Cannot read property of undefined" = missing Arrange step`,
  },

  {
    id:'sa11', category:'Testing', icon:'🔍',
    question:'Explain OPA5 (sap.ui.test.Opa5) and write a complete test that verifies: app loads, user clicks a purchase order row, Object Page opens showing the PO number.',
    tags:['OPA5','Integration Testing','Given-When-Then','Journeys'],
    keyPoints:['Given-When-Then','waitFor','Press action','End-to-end'],
    modelAnswer:`OPA5 (One Page Acceptance) is SAPUI5's integration testing framework for testing complete user journeys across views.

WHEN TO USE OPA5 vs QUnit:
• QUnit: test isolated functions (formatters, calculations)
• OPA5: test user interactions and navigation flows

OPA5 TEST STRUCTURE — Given/When/Then:

// File: integration/ListToDetailJourney.js
opaTest('Navigate from List to Object Page', function(Given, When, Then) {
  
  // GIVEN: Start the application in a known state
  Given.iStartMyApp();
  
  // WHEN: User interactions
  When.onTheListReportPage
    .iWaitForTheListToBeLoaded()    // wait for OData response
    .and.iClickOnTheFirstRow();     // click PO row
  
  // THEN: Verify the result
  Then.onTheObjectPage
    .iShouldSeeTheObjectPageFor('PO-12345')
    .and.iShouldSeeTheTitle('Purchase Order PO-12345')
    .and.iShouldSeeTheApproveButton();
  
  // CLEANUP
  Then.iTeardownMyApp();
});

// PAGE OBJECT — ListReportPage.js
iClickOnTheFirstRow: function() {
  return this.waitFor({
    controlType: 'sap.m.ColumnListItem',
    matchers: new AggregationLengthEquals('cells', 5),
    actions: new Press(),
    success: function() {
      Opa5.assert.ok(true, 'Clicked first table row');
    },
    error: function() {
      Opa5.assert.notOk(true, 'Could not find table row');
    }
  });
}

MOCKSERVER SETUP for OPA5:
• OPA5 tests must use MockServer — never hit real backend
• Start MockServer in the beforeEach or iStartMyApp function
• MockServer intercepts OData calls and returns test data from JSON files`,
  },

  {
    id:'sa12', category:'OData & RAP', icon:'⚡',
    question:'Compare OData V2 and OData V4. What are the key technical differences and which should you choose for new development?',
    tags:['OData V2','OData V4','RAP','Draft Handling'],
    keyPoints:['Always V4 for new dev','Draft handling','Side effects','FPM requirement'],
    modelAnswer:`OData V2 vs V4 — The definitive comparison:

PROTOCOL DIFFERENCES:
Feature              | OData V2          | OData V4
---------------------|-------------------|------------------
JSON format          | Verbose wrapper   | Clean, lean JSON
Entity sets          | EntitySet syntax  | Collections
Function imports     | callFunction()    | Bound/unbound actions
Batch requests       | Manual $batch     | Auto-batching built-in
Draft handling       | ❌ Not supported  | ✅ Native support
Side effects         | ❌ Not supported  | ✅ @Core.SideEffects
Deep insert          | Limited           | Full support
Metadata             | $metadata (basic) | Richer metadata

SAP-SPECIFIC ADVANTAGES OF V4:
✅ Required for Flexible Programming Model (FPM) building blocks
✅ Required for ABAP RAP services (new backend model)
✅ Native Draft Handling (save incomplete entities without committing)
✅ Side Effects (auto-refresh related fields after property changes)
✅ Bound actions directly on entities (approve, reject, submit)
✅ Deep insert (create parent + children in one request)
✅ Dynamic filter expressions (not possible in V2)

WHEN TO USE V2:
Only for maintaining existing V2 services in legacy apps.
Never choose V2 for new development.

EXAM RULE: Any question asking "V2 or V4 for new development?" — ALWAYS answer V4.
Any question about FPM building blocks — ALWAYS V4 (required, no exceptions).

HOW V4 SERVICES ARE CREATED:
ABAP RAP (RESTful Application Programming Model):
• CDS views (data model)
• Behaviour definition (CRUD operations, draft, actions)
• Service definition + service binding
• Auto-generates full OData V4 service`,
  },

  {
    id:'sa13', category:'OData & RAP', icon:'📝',
    question:'What is ABAP Draft Handling in OData V4? Explain the draft lifecycle and how Fiori elements presents it to users.',
    tags:['Draft Handling','RAP','OData V4','Fiori elements'],
    keyPoints:['Draft lifecycle','draftPrepare','draftActivate','Draft indicator'],
    modelAnswer:`DRAFT HANDLING — Allows users to save incomplete entities without committing to the backend database.

REAL-WORLD USE CASE:
A purchase order creation takes 15 minutes (complex form). Without draft: losing the browser tab = losing all data. With draft: app auto-saves every field change as a draft. User can close the browser and resume anytime.

HOW DRAFT WORKS IN RAP:

1. BEHAVIOUR DEFINITION includes: "draft; enable;"
  define behavior for ZPurchaseOrder
    draft; enable;
    { ... field operations ... }

2. DRAFT ENTITY SET is automatically created by RAP:
  Active entity: ZPurchaseOrderSet (committed data)
  Draft entity: ZPurchaseOrderSet/drafts (in-progress data)

3. DRAFT LIFECYCLE (actions):
  User starts creating → IsActiveEntity: false (draft created)
  User edits fields → Draft entity updated with each change
  User clicks "Save" → draftPrepare() validates → draftActivate() commits → IsActiveEntity: true
  User clicks "Discard" → discardDraft() → draft deleted

HOW FIORI ELEMENTS PRESENTS DRAFTS:
✅ "Draft Indicator" badge on tiles and in the list (grey dot = "Unsaved changes")
✅ "Resume Editing" prompt when user returns to an in-progress draft
✅ "Draft was last saved X minutes ago" in the Object Page header
✅ "Discard Draft" button to abandon changes
✅ Conflict handling: if another user activates the same draft, the locking user gets a warning

EXAM KEY FACT: Draft Handling is ONLY available with OData V4 + ABAP RAP. OData V2 has NO native draft support.`,
  },

  {
    id:'sa14', category:'Security', icon:'🔒',
    question:'A Fiori app hides the "Delete" button for non-admin users using setVisible(false) in the controller. A security auditor says this is a security vulnerability. Explain why and the correct fix.',
    tags:['Backend Authorization','Security','PFCG','Auth Objects'],
    keyPoints:['Frontend is not security','Backend authorization','Authority check','PFCG'],
    modelAnswer:`THE SECURITY VULNERABILITY:
setVisible(false) is UX-only — it hides the button from normal users in the browser UI. Any user can bypass this by:
• Opening Chrome DevTools console
• Typing: sap.ui.getCore().byId('deleteBtn').firePress()
• Or making a direct HTTP DELETE request to the OData service URL
• The backend will process it because it has no authorization check

"Security through obscurity" = no security at all.

THE CORRECT FIX — Two layers always required:

LAYER 1: BACKEND AUTHORIZATION (MANDATORY)
In the ABAP OData service, add authority-check before the DELETE operation:
  AUTHORITY-CHECK OBJECT 'M_BEST_WRK' FIELD 'ACTVT' FOR '06'.
  IF sy-subrc <> 0.
    RAISE EXCEPTION TYPE cx_aco_application_exception
      EXPORTING textid = lc_not_authorized.
  ENDIF.

This makes the DELETE operation return HTTP 403 Forbidden for non-admins — regardless of what the UI shows.

LAYER 2: UI CONSISTENCY (UX improvement, not security)
Hide the button for non-admins as a UX improvement — so users don't see buttons that won't work for them. But this is OPTIONAL and not the security fix.

HOW TO CHECK AUTHORIZATION IN FIORI ELEMENTS:
Use @UI.fieldControl or a CDS annotation to hide the action for unauthorized users. This is declarative and more maintainable than controller code.

EXAM RULE: Whenever you see "hide a button for security" — flag it. UI hiding ≠ security. Backend authorization objects (ABAP authority-check) are ALWAYS required.`,
  },

  {
    id:'sa15', category:'Security', icon:'🛡️',
    question:'Design a complete role-based security model for a Fiori app with 3 user types: Viewer (read-only), Editor (create/update), Approver (all + approve). App is on BTP, backend on S/4HANA.',
    tags:['PFCG','XSUAA','Role Collections','Two-layer security'],
    keyPoints:['PFCG roles (ABAP)','XSUAA roles (BTP)','Two layers required','Principal Propagation'],
    modelAnswer:`COMPLETE TWO-LAYER SECURITY DESIGN:

LAYER 1: ABAP BACKEND — PFCG Roles

Role: Z_PO_VIEWER
• Auth object M_EINKBELEG: ACTVT = 03 (Display only)
• Fiori Catalog: Z_PO_CATALOG (tile visibility)
• No ACTVT 01 (Create) or 06 (Delete)

Role: Z_PO_EDITOR  
• Auth object M_EINKBELEG: ACTVT = 01, 02, 03 (Display, Change, Create)
• Fiori Catalog: Z_PO_CATALOG
• No approval authorization

Role: Z_PO_APPROVER
• Auth object M_EINKBELEG: ACTVT = 01, 02, 03, 06, + custom approval activity
• Fiori Catalog: Z_PO_CATALOG
• Approval-specific authorization objects

LAYER 2: SAP BTP — XSUAA Role Collections

xs-security.json scopes:
{ "name": "PO.Read" }
{ "name": "PO.Write" }
{ "name": "PO.Approve" }

BTP Role Collections:
"PO Viewer" → PO.Read scope
"PO Editor" → PO.Read + PO.Write scopes
"PO Approver" → PO.Read + PO.Write + PO.Approve scopes

BTP User Assignment:
Viewers → assigned "PO Viewer" Role Collection
Editors → assigned "PO Editor" Role Collection
Approvers → assigned "PO Approver" Role Collection

CONNECTING THE LAYERS — Principal Propagation:
User JWT token from XSUAA is forwarded through Cloud Connector to the ABAP backend. The ABAP user session maps to the same user — backend checks PFCG role accordingly.

LAUNCHPAD TILE VISIBILITY:
Tiles visible only if user has the PFCG catalog Z_PO_CATALOG assigned.
No PFCG catalog = no tile visible on Launchpad.`,
  },

  {
    id:'sa16', category:'Performance', icon:'⚡',
    question:'A Fiori List Report takes 12 seconds to load. Chrome DevTools shows 45 parallel OData requests on page load. Diagnose and fix.',
    tags:['Performance','$batch','OData optimisation','N+1 problem'],
    keyPoints:['N+1 problem','$batch grouping','$select','$expand'],
    modelAnswer:`DIAGNOSIS — The N+1 Problem:
45 parallel OData requests = classic N+1 problem. Each control/binding makes its own separate request instead of combining them.

TOOLS TO USE:
1. Chrome DevTools Network tab → filter by XHR → count OData calls, check sizes
2. ?sap-statistics=true → adds backend processing time to response headers
3. SAPUI5 Diagnostics (Ctrl+Alt+Shift+S) → Framework performance metrics

ROOT CAUSES AND FIXES:

CAUSE 1: No $batch grouping (requests fire individually)
FIX: Enable OData V4 auto-batching (on by default — check it wasn't disabled)
For V2: oModel.setUseBatch(true) in Component.js
Result: 45 requests → 1 $batch request

CAUSE 2: Missing $select (returning 50 fields, only 5 needed)
FIX: Add @UI.lineItem only to visible fields. SAPUI5 auto-generates $select.
Or explicitly: oBinding.changeParameters({ $select: 'PO_Number,Vendor,Amount' })
Result: Payload reduced 90%

CAUSE 3: Missing $expand (separate calls for related entities)
FIX: Add $expand=Supplier,LineItems to fetch related data in one request
Annotation: @UI.lineItem with navigation property fields auto-generates $expand

CAUSE 4: All SAPUI5 library loaded at startup (load time)
FIX: async="true" in SAPUI5 bootstrap, use SAPUI5 CDN instead of self-hosted
Lazy-load non-critical controls with sap.ui.require()

BEFORE: 45 × 800ms = 36 seconds total
AFTER: 1 $batch × 1.2s = 1.2 seconds

MONITORING: Use sap-statistics=true to verify backend processing time reduced too.`,
  },

  {
    id:'sa17', category:'Deployment', icon:'🚀',
    question:'Explain the complete process to deploy a Fiori app to SAP BTP Cloud Foundry using MTA (Multi-Target Application).',
    tags:['MTA','BTP','Cloud Foundry','CI/CD','Deployment'],
    keyPoints:['mta.yaml','mbt build','cf deploy','HTML5 repo','XSUAA service'],
    modelAnswer:`MTA DEPLOYMENT — Complete step-by-step:

STEP 1: PROJECT STRUCTURE
sap-fiori-app/
├── webapp/           ← SAPUI5 app files
├── xs-app.json       ← App Router config
├── xs-security.json  ← XSUAA config
├── mta.yaml          ← MTA deployment descriptor
└── package.json

STEP 2: mta.yaml (key sections)
modules:
  - name: my-app          ← HTML5 app module
    type: html5
    path: webapp
    build-parameters:
      builder: custom
      commands: [npm run build]
      
  - name: my-approuter    ← Application Router
    type: approuter.nodejs
    path: approuter
    requires:
      - name: xsuaa-service
      - name: html5-repo-runtime
      
resources:
  - name: xsuaa-service
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      config: xs-security.json
      
  - name: html5-repo-host  ← Where app files are stored
    type: org.cloudfoundry.managed-service

STEP 3: BUILD
  npm run build           ← SAPUI5 Tooling optimises/minifies
  mbt build               ← Creates MTAR archive (my-app.mtar)

STEP 4: DEPLOY
  cf login -a https://api.cf.eu10.hana.ondemand.com
  cf target -o my-org -s my-space
  cf deploy my-app.mtar  ← Deploys all modules + creates BTP services

STEP 5: VERIFY
  cf apps                 ← Check app status (running/stopped)
  cf logs my-approuter    ← Check for errors

CI/CD AUTOMATION (SAP CI/CD Service):
• Git push → pipeline triggers
• npm install + npm run build → mbt build → cf deploy
• Optional: run QUnit/OPA5 tests before deploy`,
  },

  {
    id:'sa18', category:'Launchpad', icon:'🏠',
    question:'What are the different Fiori Launchpad tile types? Give a scenario for each and explain how Dynamic tiles are configured.',
    tags:['Launchpad','Static tile','Dynamic tile','Custom tile','KPI'],
    keyPoints:['Static = hardcoded','Dynamic = OData call','Custom = HTML','PFCG catalog'],
    modelAnswer:`THREE LAUNCHPAD TILE TYPES:

1. STATIC TILE
Content: Hardcoded text — title, subtitle, icon. Never changes.
Use case: Navigation link to an app ("Open Purchase Orders")
Scenario: "Procurement App" tile — just opens the app, no live data
Configuration: PFCG catalog, static tile with fixed title + subtitle

2. DYNAMIC TILE  
Content: Live number fetched from backend on each Launchpad load
Use case: Show count of open tasks, pending approvals, alerts
Scenario: "47 Open POs" tile — number updates each time Launchpad opens
How it works: Calls an OData function import that returns { Count: 47 }

DYNAMIC TILE CONFIGURATION:
In PFCG Launchpad catalog, create a Dynamic tile:
• Service URL: /sap/opu/odata/sap/MY_SERVICE/
• Function import: /GetOpenPOCount
• Number unit: "POs"  
• Number: map to Count property in response
• Threshold: set semantic colour (e.g., >100 = red/urgent)

OData function import definition (ABAP):
FUNCTION GetOpenPOCount IMPORTING EXPORTING ev_count TYPE i
Returns: { d: { Count: 47, Unit: 'POs' } }

3. CUSTOM TILE
Content: Fully custom HTML/SAPUI5 view — any layout possible
Use case: Complex visualisation, mini chart, multiple KPIs in one tile
Scenario: Mini revenue sparkline chart embedded in the tile
Development: Full SAPUI5 component with a TileContent control

TILE VISIBILITY CONTROL:
Tiles are visible ONLY to users who have the Fiori Catalog containing the tile assigned in their PFCG role. This is the primary access control mechanism for the Launchpad.

EXAM RULE: Live number on tile = ALWAYS Dynamic tile. This is tested in nearly every C_FIORD exam variant.`,
  },

  {
    id:'sa19', category:'CDS Annotations', icon:'🎨',
    question:'Explain @UI.fieldControl and how it enables dynamic field editability based on user role or business rules.',
    tags:['@UI.fieldControl','Dynamic editability','Auth check','Field control values'],
    keyPoints:['0=Hidden','7=ReadOnly','8=Optional/Editable','CDS calculated field'],
    modelAnswer:`@UI.fieldControl enables dynamic field editability — different users see the same field as editable or read-only based on computed values.

FIELD CONTROL VALUES:
0 = Hidden (not rendered at all)
1 = ReadOnly (shown but not editable, same as 7)
7 = ReadOnly (displayed as text, cannot be edited)
8 = Optional (editable input field)
9 = Mandatory (editable with required validation)

HOW TO IMPLEMENT:

STEP 1: Add a calculated field to the CDS view:
@UI.hidden: true  ← hide the control field from UI
SalaryEditMode as SalaryFieldControl : Integer

STEP 2: Calculate field control value in ABAP CDS:
case $session.system_language  ← or use authority check
  when 'HR_MANAGER_ROLE' then 8  ← Editable for HR Managers
  else 7                          ← ReadOnly for everyone else
end as SalaryFieldControl,

OR using ABAP RAP computed field:
METHOD get_global_features.
  authority-check object 'HR_SALARY' field 'ACTVT' for '02'.
  result-SalaryFieldControl = COND #( WHEN sy-subrc = 0 THEN if_abap_behv=>fc-f-optional
                                      ELSE if_abap_behv=>fc-f-read_only ).

STEP 3: Annotate the salary field:
@UI.fieldControl: 'SalaryFieldControl'
Salary;

RESULT in Fiori elements:
• HR Managers → Salary renders as an editable input field
• Standard users → Salary renders as display text (not editable)
• The field control is evaluated at runtime per user

EXAM KEY POINTS:
• fieldControl references a CDS field (not a hardcoded value)
• The CDS field must return 7 or 8 (or 0 to hide)
• This is the SAP-approved approach for role-based field editability
• Alternative: multiple CDS views per role (less maintainable, not recommended)`,
  },

  {
    id:'sa20', category:'Debugging', icon:'🐛',
    question:'A Fiori app shows blank data after deploying to BTP production, but works perfectly locally with MockServer. Walk through your complete debugging approach.',
    tags:['Debugging','403 Error','MockServer','Production issues'],
    keyPoints:['Check HTTP status','Auth objects','Destination config','Network tab'],
    modelAnswer:`STEP-BY-STEP PRODUCTION DEBUGGING:

STEP 1: CHECK THE NETWORK TAB FIRST
Open Chrome DevTools → Network → filter XHR
Look for OData requests. What HTTP status do they return?

HTTP 401 → Authentication failed
  Fix: Check XSUAA config, user assignment to Role Collections in BTP Cockpit

HTTP 403 → Authenticated but NOT authorized
  Fix: Check PFCG roles — user is missing authorization objects for this operation
  Root cause: MockServer bypasses all auth. Production enforces ABAP authority-check.

HTTP 404 → Service/URL not found
  Fix: Check manifest.json dataSource URL, verify OData service is active in backend (/IWFND/MAINT_SERVICE)

HTTP 500 → Backend server error
  Fix: Check SAP system logs (SM21, ST22), OData service error log

HTTP 200 with empty data → Service works but no data returned
  Fix: Check CDS view DCLS (data control) — may be filtering all records for this user
  Also check: @AbapCatalog.sqlViewName, field mapping issues

STEP 2: IF 200 BUT EMPTY DATA
Check ABAP CDS Data Control Language Statement (DCLS):
  define role ZPurchaseOrderRole {
    grant select on ZPurchaseOrderCDS
    where (Vendor = aspect pfcg_auth(M_BEST_WRK, LIFNR, ACTVT = '03'));
  }
If user's PFCG role doesn't include the required vendor in authorization field → all rows filtered out.

STEP 3: VERIFY DESTINATION & CLOUD CONNECTOR
BTP Cockpit → Connectivity → Destinations → click your destination → "Check Connection"
If fails: Cloud Connector may be down or the on-premise firewall changed.

STEP 4: CHECK APPLICATION ROUTER LOGS
cf logs my-approuter --recent
Look for: routing errors, authentication failures, destination resolution issues.

EXAM KEY FACT: "Works locally with MockServer, fails in production" = almost always an authorization issue (403/401) or service configuration difference. MockServer never enforces authorization.`,
  },

  {
    id:'sa21', category:'UI5 Framework', icon:'💡',
    question:'Explain the SAPUI5 MVC pattern. What is the role of each component and how do they interact in a Fiori app?',
    tags:['MVC','Model','View','Controller','Data binding'],
    keyPoints:['Model=data','View=XML','Controller=logic','One-way vs Two-way binding'],
    modelAnswer:`SAPUI5 MVC ARCHITECTURE:

MODEL (Data Layer)
Holds the application's data. Types:
• ODataModel V2/V4: Connects to OData services, handles CRUD operations, auto-batching
• JSONModel: Client-side in-memory data (for UI state, local configuration)
• ResourceModel: i18n translations from .properties files
• XMLModel: For XML data sources

VIEW (Presentation Layer)
XML-based declarative UI definition. Separated from logic.
• webapp/view/ListReport.view.xml
• Declares controls: <List>, <Table>, <Input>
• Uses data binding: {modelName>propertyPath}
• References controller: controllerName="my.app.controller.Main"

CONTROLLER (Logic Layer)
JavaScript file handling user interactions and business logic:
• Lifecycle: onInit(), onBeforeRendering(), onAfterRendering(), onExit()
• Event handlers: onApprovePress(), onSearch()
• Data manipulation: set/get model data, call OData

DATA BINDING (connects Model ↔ View):
One-way binding (default): {/PropertyPath} — Model → View, View can't update model
Two-way binding: {/PropertyPath} with model set to two-way — View changes update model
Expression binding: {= \${/Status} === 'APPROVED' ? 'Success' : 'Error'}

LIFECYCLE FLOW:
1. Component.js bootstraps the app, creates models
2. Routes in manifest.json map URLs to views
3. View is instantiated, controller.onInit() fires
4. Model data loads asynchronously
5. View re-renders as data arrives (data binding)
6. User interactions trigger controller event handlers
7. Controller reads/writes model, triggers OData operations

FIORI ELEMENTS abstracts this: annotations drive the View generation automatically. Developers only write controllers for custom logic, not standard CRUD.`,
  },

  {
    id:'sa22', category:'i18n & Localisation', icon:'🌍',
    question:'A Fiori app must support English, German, and Japanese with appropriate date and number formatting. How does SAPUI5 handle this?',
    tags:['i18n','ResourceModel','Locale','Date formatting','Number formatting'],
    keyPoints:['ResourceModel','.properties files','Locale-aware formatting','Semantic annotations'],
    modelAnswer:`SAPUI5 LOCALISATION — Three mechanisms:

1. TEXT TRANSLATIONS — ResourceModel + .properties files

File structure:
webapp/i18n/i18n.properties           ← Default (English)
webapp/i18n/i18n_de.properties        ← German
webapp/i18n/i18n_ja.properties        ← Japanese

File content (i18n.properties):
APPROVE_BUTTON=Approve
REJECT_BUTTON=Reject
WELCOME_MSG=Welcome, {0}!

File content (i18n_de.properties):
APPROVE_BUTTON=Genehmigen
REJECT_BUTTON=Ablehnen
WELCOME_MSG=Willkommen, {0}!

manifest.json ResourceModel registration:
"sap.ui5": {
  "models": {
    "i18n": {
      "type": "sap.ui.model.resource.ResourceModel",
      "settings": { "bundleName": "my.app.i18n.i18n" }
    }
  }
}

XML view binding: <Button text="{i18n>APPROVE_BUTTON}"/>

SAPUI5 auto-selects the right .properties file based on browser locale.

2. DATE & NUMBER FORMATTING — sap.ui.core.format.DateFormat
SAPUI5 reads browser locale automatically:
• en-US: 1/15/2024, 1,234.56
• de-DE: 15.01.2024, 1.234,56
• ja-JP: 2024/01/15, 1,234.56

XML view with auto-formatting:
<Text text="{path: '/DocumentDate', type: 'sap.ui.model.type.Date', formatOptions: {style: 'medium'}}"/>

3. CURRENCY & QUANTITY — Semantic Annotations
@Semantics.amount.currencyCode: 'CurrencyCode'
Fiori elements auto-formats 1234.5 as €1.234,50 (German) or $1,234.50 (US)

EXAM KEY POINTS:
• ResourceModel is the ONLY correct mechanism for text translations
• "Showing APPROVE_BUTTON_LABEL raw" = model name mismatch or file 404
• Date/number formatting is automatic from browser locale — no code needed`,
  },

  {
    id:'sa23', category:'Floor Plans', icon:'📱',
    question:'How do you design a SAP Fiori app for mobile devices? What SAP design principles and technical considerations apply?',
    tags:['Mobile','Responsive design','SAP Fiori principles','Adaptive'],
    keyPoints:['5 Fiori principles','sap.m library','Responsive containers','MDK for offline'],
    modelAnswer:`MOBILE FIORI DESIGN — Complete approach:

SAP'S 5 FIORI DESIGN PRINCIPLES:
1. SIMPLE — One primary action per screen. Remove everything not essential.
2. COHERENT — Consistent patterns across apps (same icons, same navigation)
3. ROLE-BASED — Show only what the user's role needs. No "everything for everyone."
4. RESPONSIVE — Same app works on mobile, tablet, desktop. Adapt, don't create separate apps.
5. INSTANT VALUE — Core functionality accessible in ≤3 taps.

TECHNICAL TOOLS FOR RESPONSIVE DESIGN:

sap.m LIBRARY (Mobile-first controls):
• sap.m.List — single-column list (mobile-friendly, no horizontal scroll)
• sap.m.ColumnListItem with responsive columns (hide on small screens)
• sap.m.Panel with expandable sections
• sap.m.NavContainer — slide navigation between pages

RESPONSIVE COLUMN HIDING (@UI.lineItem demandPopin: true):
@UI.lineItem: [{
  position: 10, Value: PONumber,         ← Always visible
  Importance: #High
}, {
  position: 20, Value: DocumentDate,
  Importance: #Medium,                   ← Hidden on small screens
  ResponsivePopinDisplay: #Expand
}]

FLEXIBLE COLUMN LAYOUT (2 and 3 column on tablet/desktop):
manifest.json: "defaultTwoColumnLayoutType": "ThreeColumnsMidExpanded"
Mobile: Shows single column only (full screen)
Tablet: 2-column (list + detail)
Desktop: 3-column (list + detail + sub-detail)

FOR OFFLINE MOBILE:
Use SAP Mobile Development Kit (MDK) instead of Fiori elements
MDK provides: Offline OData sync, native device APIs (camera, GPS, barcode), push notifications

EXAM APPROACH: Mobile = sap.m library + responsive popins + SAP Fiori principles + 3-tap max for primary task.`,
  },

  {
    id:'sa24', category:'CI/CD', icon:'🔄',
    question:'A team of 6 developers is building 15 Fiori apps on SAP BTP using Git. Describe the complete Git workflow and CI/CD pipeline setup.',
    tags:['Git workflow','CI/CD','BAS','Feature branches','Automated testing'],
    keyPoints:['Feature branches','Pull Requests','Automated tests','cf deploy'],
    modelAnswer:`COMPLETE GIT + CI/CD WORKFLOW:

GIT BRANCHING STRATEGY:
main (production-ready code only)
  └── develop (integration branch)
        ├── feature/approval-workflow (Developer A)
        ├── feature/filter-improvements (Developer B)
        └── fix/kpi-tile-count (Developer C)

DAILY WORKFLOW:
1. git checkout develop && git pull (sync latest)
2. git checkout -b feature/my-feature (create feature branch)
3. Code changes in BAS
4. git commit -m "feat: add approve button to PO Object Page"
5. git push origin feature/my-feature
6. Create Pull Request (feature → develop)
7. Team member reviews code
8. Automated CI runs (see below)
9. Merge to develop after approval + CI passes
10. Weekly: develop → main (release)

CI/CD PIPELINE (SAP CI/CD Service or GitHub Actions):

Triggered on: every commit to develop or Pull Request

PIPELINE STAGES:
Stage 1: Install
  npm install --ci

Stage 2: Lint
  npx eslint src/ --max-warnings 0

Stage 3: Unit Tests
  npx karma start karma.conf.js --single-run

Stage 4: Build
  npm run build
  mbt build

Stage 5: Deploy to TEST space
  cf login && cf deploy my-app.mtar --strategy blue-green

Stage 6: OPA5 Integration Tests (against test space)
  npx wdio wdio.conf.js

Stage 7: (on main only) Deploy to PRODUCTION
  cf deploy my-app.mtar --strategy blue-green

MANIFEST.JSON CONFLICTS (common with 6 developers):
Use BAS 3-way merge editor to resolve. Each developer works on separate routes/targets to minimise overlap.

EXAM POINT: "Blue-green deployment" = deploy new version alongside old, switch routing, keep old running until sessions drain. Zero downtime.`,
  },

  {
    id:'sa25', category:'Advanced Scenarios', icon:'🏆',
    question:'A company starts a greenfield SAP S/4HANA Cloud implementation. They need to build 20 Fiori apps and ask you to design the complete development architecture. What do you recommend?',
    tags:['Architecture','Greenfield','S/4HANA Cloud','RAP','BTP'],
    keyPoints:['BAS dev spaces','RAP backend','OData V4','BTP HTML5 repo','Launchpad Service'],
    modelAnswer:`COMPLETE GREENFIELD FIORI ARCHITECTURE:

CATEGORISE THE 20 APPS:
• 14 standard transactional → Fiori elements (LR+OP or Worklist+OP)
• 4 analytical → Fiori elements ALP + RAP analytical queries
• 2 complex custom → FPM (mix standard building blocks + custom sections)
• 0 freestyle → avoid unless truly unavoidable

BACKEND — ABAP RAP + OData V4:
All services use ABAP RAP (RESTful Application Programming Model):
• CDS views for data model
• Behaviour definitions for CRUD, draft, actions
• Service definitions + bindings → auto-generates OData V4
• Benefits: draft handling, side effects, FPM compatibility

FRONTEND DEVELOPMENT:
Tool: SAP Business Application Studio (BAS) — cloud-based IDE
• Each developer gets a dev space
• Apps scaffolded from SAP Fiori generators (linked to RAP services)
• Real-time preview via BTP Destination to system

VERSION CONTROL:
• GitHub or Bitbucket (enterprise Git)
• Feature branch → develop → main workflow
• SAP CI/CD Service pipeline on every merge

DEPLOYMENT ARCHITECTURE:
Apps → HTML5 Application Repository (BTP CF)
Routing → Application Router (xs-app.json) 
Auth → XSUAA with SAP IAS as Identity Provider (connecting corporate Azure AD)
Backend → S/4HANA Cloud (OData V4, public APIs via API Hub)

NOTE: S/4HANA Cloud = no Cloud Connector needed (public cloud APIs accessible directly via HTTPS)
For S/4HANA on-premise → Cloud Connector required

LAUNCHPAD:
SAP Build Work Zone (Standard Edition) for centralised Fiori portal
Role-based content from BTP role assignments (maps to S/4HANA business roles)

TRANSPORT MANAGEMENT:
S/4HANA Cloud ABAP: SolMan or ABAP CTS (managed by SAP)
BTP Fiori apps: SAP Cloud Transport Management Service (CTM) → Test → Prod pipeline

MONITORING:
SAP Cloud ALM → technical monitoring, alert management
SAP Adoption Reporting → which apps are used, by whom, how often`,
  },

  {
    id:'sa26', category:'Annotations', icon:'🔗',
    question:'Explain how OData navigation annotations work. How do you display related entity data (e.g., Supplier details) on a Purchase Order Object Page?',
    tags:['Navigation','@UI.facets','_Association','Object Page','Related entities'],
    keyPoints:['Navigation association','_AssocName/@UI.LineItem','ReferenceFacet','$expand'],
    modelAnswer:`NAVIGATION ANNOTATIONS — Displaying related entity data:

SCENARIO: Purchase Order Object Page needs a "Line Items" tab showing all PO lines, and a "Supplier" section showing supplier details.

STEP 1: DEFINE ASSOCIATIONS IN CDS VIEW:
define view ZPurchaseOrder as select from zpurchaseorder {
  key PONumber,
  Vendor,
  Amount,
  
  // Association to line items (1:N)
  _LineItems,      ← This is a CDS association to ZPurchaseOrderItem
  
  // Association to supplier (N:1)  
  _Supplier        ← This is a CDS association to ZSupplier
}

STEP 2: ANNOTATE LINE ITEMS (table section):
Object Page facet for a related entity TABLE:
@UI.facets: [{
  $Type: 'UI.ReferenceFacet',
  Target: '_LineItems/@UI.LineItem',  ← navigation path + annotation
  Label: 'Line Items',
  ID: 'LineItemsFacet'
}]

The @UI.lineItem annotations are placed on ZPurchaseOrderItem CDS view — not on the parent.

STEP 3: ANNOTATE SUPPLIER (form section):
@UI.facets: [{
  $Type: 'UI.ReferenceFacet',
  Target: '_Supplier/@UI.FieldGroup#SupplierDetails',
  Label: 'Supplier Information',
  ID: 'SupplierFacet'
}]

On ZSupplier CDS view:
@UI.fieldGroup #SupplierDetails: [
  { position: 10, Value: SupplierName },
  { position: 20, Value: City },
  { position: 30, Value: PhoneNumber }
]

HOW FIORI ELEMENTS HANDLES THIS:
• Generates Object Page with "Line Items" tab (table) and "Supplier Information" section (form)
• Auto-generates $expand=_LineItems,_Supplier in the OData GET request
• All related data loaded in a single OData call — no separate requests

EXAM KEY: Target uses the navigation property name with underscore prefix: '_LineItems/@UI.LineItem'`,
  },
]

export const SAMPLE_CATEGORIES = [
  'All',
  'Floor Plans',
  'Annotations',
  'BTP & Connectivity',
  'Extensibility',
  'Testing',
  'OData & RAP',
  'Security',
  'Performance',
  'Deployment',
  'Debugging',
  'UI5 Framework',
  'i18n & Localisation',
  'CI/CD',
  'Advanced Scenarios',
  'Launchpad',
  'CDS Annotations',
]
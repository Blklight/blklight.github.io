/**
 * blklight API - TypeScript Types
 *
 * Version: 1.0.0
 * Description: Complete TypeScript types for the blklight API.
 *              Copy this file to your frontend project for full type safety.
 *
 * Copy Instructions:
 *   - Save as `types/api.types.ts` in your frontend project
 *   - No runtime dependencies - this file is 100% pure TypeScript
 *   - Keep in sync with API changes
 *
 * @see form.schemas.ts for Zod form validation schemas
 *
 * Note on Dates: All date fields are ISO 8601 strings (e.g., "2024-01-15T10:30:00.000Z")
 */

// =============================================================================
// SHARED BASE TYPES
// =============================================================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  message: string;
}

/**
 * API error details
 */
export interface ApiError {
  code: string;
  message: string;
  fields?: Record<string, string>;
}

/**
 * Validation error response
 */
export interface ApiValidationError extends ApiError {
  code: "VALIDATION_ERROR";
  fields: Record<string, string>;
}

/**
 * Paginated result wrapper
 */
export interface PaginatedResult<T> {
  items: T[];
  nextCursor: string | null;
}

// =============================================================================
// ENUMS & CONSTANTS
// =============================================================================

/**
 * Note and journal colors (Tailwind CSS color names)
 */
export type NoteColor =
  | "slate"
  | "gray"
  | "zinc"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

/**
 * Document status
 */
export type DocumentStatus = "draft" | "published" | "archived";

/**
 * Document types
 */
export type DocumentType =
  | "article"
  | "tutorial"
  | "contract"
  | "project"
  | "page";

/**
 * Note types
 */
export type NoteType = "text" | "code" | "list";

/**
 * Book status
 */
export type BookStatus = "draft" | "published";

/**
 * Follow status
 */
export type FollowStatus = "accepted" | "pending" | "rejected" | null;

/**
 * Typography options
 */
export type Typography = "sans" | "serif" | "mono";

/**
 * Exercise types
 */
export type ExerciseType = "code" | "quiz";

/**
 * Supported programming languages for exercises
 */
export type SupportedLanguage = "javascript" | "typescript";

// =============================================================================
// AUTH TYPES
// =============================================================================

/**
 * POST /api/v1/auth/register
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/v1/auth/register', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     email: 'user@example.com',
 *     username: 'johndoe',
 *     password: 'SecurePass123!'
 *   })
 * });
 * ```
 */
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

/**
 * POST /api/v1/auth/login
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/v1/auth/login', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     identifier: 'user@example.com', // or username
 *     password: 'SecurePass123!'
 *   })
 * });
 * ```
 */
export interface LoginRequest {
  identifier: string;
  password: string;
  /** "Lembrar de mim": longer refresh cookie/session TTL. Default false. */
  rememberMe?: boolean;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
}

/**
 * Refresh token response
 */
export interface RefreshResponse {
  accessToken: string;
  user?: User | null;
  profile?: ProfileMe | null;
  apps?: string[] | null;
}

/**
 * OAuth user (internal)
 */
export interface OAuthUser {
  id: string;
  email: string;
  name: string;
  login?: string;
}

// =============================================================================
// USER TYPES
// =============================================================================

/**
 * User entity (private - not exposed in API responses)
 */
export interface User {
  id: string;
  email: string;
  username: string;
  emailVerified: boolean;
  role: "user" | "admin";
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt?: string;
}

// =============================================================================
// PROFILE TYPES
// =============================================================================

/**
 * Social links for profiles
 */
export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

/**
 * Profile entity
 */
export interface Profile {
  id: string;
  userId: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  bioPrivate: string | null;
  avatarUrl: string | null;
  socialLinks: SocialLinks | null;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Public profile (GET /api/v1/profiles/:username).
 * Backend schema has no id: username, displayName, bio, bioPrivate, avatarUrl,
 * socialLinks, createdAt, isPrivate, isFollowing, followStatus.
 */
export interface ProfilePublic {
  username: string;
  displayName: string | null;
  bio: string | null;
  bioPrivate: string | null;
  avatarUrl: string | null;
  socialLinks: SocialLinks | null;
  isPrivate: boolean;
  isFollowing: boolean | null; // null = no authenticated viewer / self
  followStatus: FollowStatus;
  createdAt: string;
}

/**
 * Public profile with extended info (for followers) — same wire shape as
 * ProfilePublic, kept as a separate type for downstream readability.
 */
export interface ProfileExtended extends ProfilePublic {}

/**
 * PATCH /api/v1/profiles/me
 */
export interface UpdateProfileRequest {
  username?: string;
  displayName?: string | null;
  bio?: string | null;
  bioPrivate?: string | null;
  avatarUrl?: string | null;
  socialLinks?: SocialLinks | null;
  isPrivate?: boolean;
}

/**
 * Response de GET /api/v1/profiles/me (FullProfile do backend).
 * Não usa Profile diretamente: o server omite id/userId e acrescenta
 * email/emailVerified/role/isFollowing/followStatus.
 */
export interface ProfileMe {
  username: string;
  displayName: string | null;
  bio: string | null;
  bioPrivate: string | null;
  avatarUrl: string | null;
  socialLinks: SocialLinks | null;
  createdAt: string;
  isPrivate: boolean;
  isFollowing: boolean | null;
  followStatus: "accepted" | "pending" | "rejected" | null;
  email: string;
  emailVerified: boolean;
  role: "user" | "admin";
}

// =============================================================================
// DOCUMENT TYPES
// =============================================================================

/**
 * Authorship signature (set on publish, null while draft)
 */
export interface Authorship {
  authorName: string;
  username: string;
  userHash: string;
  documentHash: string;
  publicIdentifier: string;
  hmac: string;
  signedAt: string;
}

/**
 * Document card for the public feed (DOCUMENT_CARD_SCHEMA).
 * Differs from DocumentFull: flat `likesCount` (no per-viewer `likedByMe`),
 * partial authorship (only publicIdentifier), and NO status/updatedAt/createdAt.
 */
export interface DocumentCard {
  id: string;
  title: string;
  abstract: string | null;
  coverImageUrl: string | null;
  slug: string;
  typeName: DocumentType;
  publishedAt: string;
  author: DocumentAuthor;
  authorship: {
    publicIdentifier: string;
  };
  likesCount: number;
  category: CategorySummary | null;
  tags: TagSummary[];
  /** Organization the document is published under, null when it is personal. */
  organization: OrganizationRef | null;
}

/**
 * Document author (minimal profile for document cards, AUTHOR_SCHEMA).
 * The public schemas never expose a profile id here.
 */
export interface DocumentAuthor {
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
}

/**
 * Organization reference embedded in document payloads (ORGANIZATION_REF_SCHEMA).
 *
 * The backend resolves the organization of a document to this reduced shape
 * (id + handle + display name); the owner handle `orgname` is what the
 * public routes use (`/org/:orgname`).
 */
export interface OrganizationRef {
  id: string;
  orgname: string;
  name: string;
}

/**
 * GET /api/v1/documents/me
 *
 * Lightweight summary of one of the current user's documents (no content
 * or style). Used for listing my documents.
 */
export interface DocumentSummary {
  id: string;
  title: string;
  abstract: string | null;
  status: DocumentStatus;
  typeName: DocumentType;
  slug: string;
  coverImageUrl: string | null;
  authorship: Authorship | null;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
  /** Organization the document belongs to, null when it is personal. */
  organization: OrganizationRef | null;
}

/**
 * Document full response for GET /:username/:slug (DOCUMENT_FULL_SCHEMA).
 * Differs from DocumentCard: nested `likes` (per-viewer `likedByMe`), full
 * authorship, content/style/exercises, and NO status/updatedAt/createdAt.
 */
export interface DocumentFull {
  id: string;
  title: string;
  abstract: string | null;
  content: Record<string, unknown> | null;
  coverImageUrl: string | null;
  slug: string;
  typeName: DocumentType;
  publishedAt: string;
  author: DocumentAuthor;
  style: DocumentStyle;
  authorship: Authorship | null;
  likes: {
    likesCount: number;
    likedByMe: boolean | null; // null = unauthenticated
  };
  category: CategorySummary | null;
  tags: TagSummary[];
  exercises?: ExerciseSummary[];
  /** Organization the document is published under, null when it is personal. */
  organization: OrganizationRef | null;
}

/**
 * Document style settings
 */
export interface DocumentStyle {
  typography: Typography;
  paperStyle: Record<string, unknown> | null;
  paperTexture: Record<string, unknown> | null;
  coverSettings: Record<string, unknown> | null;
  documentHeader: Record<string, unknown> | null;
  documentFooter: Record<string, unknown> | null;
  documentSignature: Record<string, unknown> | null;
}

/**
 * Exercise summary (returned with document)
 */
export interface ExerciseSummary {
  id: string;
  type: ExerciseType;
  data: ExerciseDataSummary;
}

/**
 * Exercise data for readers (excludes correct answers)
 * Note: correct_index and expected_output are NEVER returned to readers
 */
export type ExerciseDataSummary =
  | {
      type: "code";
      prompt: string;
      language: SupportedLanguage;
      initialCode: string;
    }
  | {
      type: "quiz";
      question: string;
      options: string[];
    };

/**
 * Document style template
 */
export interface DocumentStyleTemplate {
  id: string;
  authorId: string;
  name: string;
  documentType: DocumentType | null;
  typography: Typography;
  paperStyle: Record<string, unknown> | null;
  paperTexture: Record<string, unknown> | null;
  documentHeader: Record<string, unknown> | null;
  documentFooter: Record<string, unknown> | null;
  createdAt: string;
}

/**
 * POST /api/v1/documents
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/v1/documents', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': `Bearer ${accessToken}`
 *   },
 *   body: JSON.stringify({
 *     title: 'My Article',
 *     type: 'article',
 *     content: { type: 'doc', content: [...] }
 *   })
 * });
 * ```
 */
export interface CreateDocumentRequest {
  title: string;
  abstract?: string | null;
  content?: Record<string, unknown> | null;
  coverImageUrl?: string | null;
  type: DocumentType;
  slug?: string;
  categoryId?: string | null;
  tags?: string[];
  /**
   * Organization the document belongs to. `null` (or omitted) keeps it
   * personal; the backend accepts a change after publication too.
   */
  organizationId?: string | null;
}

/**
 * PATCH /api/v1/documents/:id
 */
export interface UpdateDocumentRequest {
  title?: string;
  abstract?: string | null;
  content?: Record<string, unknown> | null;
  coverImageUrl?: string | null;
  type?: DocumentType;
  slug?: string;
  typography?: Typography;
  paperStyle?: Record<string, unknown> | null;
  paperTexture?: Record<string, unknown> | null;
  coverSettings?: Record<string, unknown> | null;
  documentHeader?: Record<string, unknown> | null;
  documentFooter?: Record<string, unknown> | null;
  documentSignature?: Record<string, unknown> | null;
  categoryId?: string | null;
  tags?: string[];
  /**
   * Organization the document belongs to. Sending `null` removes the link
   * (the document becomes personal again).
   */
  organizationId?: string | null;
}

/**
 * Full document returned by POST /api/v1/documents (201),
 * PATCH /api/v1/documents/:id and PATCH /api/v1/documents/:id/publish.
 * Distinct from DocumentFull (public read shape): includes authorId/typeId/
 * status/createdAt/updatedAt and a nested `style` object.
 */
export interface DocumentWithStyle {
  id: string;
  authorId: string;
  typeId: string;
  typeName: string;
  status: DocumentStatus;
  title: string;
  abstract: string | null;
  content: Record<string, unknown> | null;
  coverImageUrl: string | null;
  slug: string;
  authorship: Authorship | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  style: DocumentStyle;
  /** Organization the document belongs to, null when it is personal. */
  organization: OrganizationRef | null;
}

/**
 * GET /api/v1/documents/:id (auth, owner) — MyDocumentDetail.
 * Like DocumentWithStyle plus category and tags. NOTE: POST/PATCH/publish
 * responses only carry DOCUMENT_WITH_STYLE_SCHEMA (no category/tags), so this
 * type is ONLY guaranteed on the GET detail response.
 */
export interface MyDocumentDetail extends DocumentWithStyle {
  category: CategorySummary | null;
  tags: TagSummary[];
}

/**
 * Feed query parameters
 */
export interface FeedQuery {
  cursor?: string;
  limit?: number;
  type?: DocumentType;
  author?: string;
  q?: string;
  sort?: "recent" | "popular";
  category?: string;
  tag?: string;
}

/**
 * One page of the public feed (GET /api/v1/documents).
 * Not the same shape as PaginatedResult<T>: the feed also reports `total`,
 * which counts only the documents visible to the current viewer.
 */
export interface FeedResult {
  items: DocumentCard[];
  nextCursor: string | null;
  total: number;
}

// =============================================================================
// CATEGORY & TAG TYPES
// =============================================================================

/**
 * Category entity
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  createdAt: string;
  children?: Category[];
}

/**
 * Category summary (for document cards)
 */
export interface CategorySummary {
  id: string;
  name: string;
  slug: string;
}

/**
 * Tag entity
 */
export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

/**
 * Tag summary (for document cards)
 */
export interface TagSummary {
  id: string;
  name: string;
  slug: string;
}

// =============================================================================
// ORGANIZATION TYPES
// =============================================================================

/**
 * Organization entity (ORGANIZATION_SCHEMA).
 *
 * `orgname` is the public handle used by the `/org/:orgname` routes;
 * `name` is the display name shown in the UI.
 */
export interface Organization {
  id: string;
  ownerId: string;
  name: string;
  orgname: string;
  description: string | null;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Organization the current user belongs to (GET /api/v1/organizations/me).
 *
 * The membership role is only known by the backend on this listing, so it is
 * not part of the shared `Organization` shape.
 */
export interface MyOrganization extends Organization {
  myRole: OrganizationRole;
}

/**
 * Role of the current user inside an organization.
 */
export type OrganizationRole = "owner" | "admin" | "member";

// =============================================================================
// BOOK TYPES
// =============================================================================

/**
 * Book card for feed
 */
export interface BookCard {
  id: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  slug: string;
  status: BookStatus;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
  authorship: Authorship | null;
  author: DocumentAuthor;
  chaptersCount: number;
  likesCount: number;
  category?: CategorySummary;
  tags: TagSummary[];
  likedByMe: boolean | null;
}

/**
 * Book chapter
 */
export interface BookChapter {
  id: string;
  bookId: string;
  documentId: string;
  position: number;
  introText: string | null;
  outroText: string | null;
  document: ChapterDocument;
}

/**
 * Chapter document (minimal - title, abstract, slug only)
 */
export interface ChapterDocument {
  id: string;
  title: string;
  abstract: string | null;
  slug: string;
}

/**
 * Table of contents item
 */
export interface TocItem {
  chapterId: string;
  title: string;
  headings: Heading[];
}

/**
 * Heading in TOC
 */
export interface Heading {
  level: number;
  text: string;
  anchor: string;
}

/**
 * Book full response
 */
export interface BookFull extends BookCard {
  description: string | null;
  toc: TocItem[] | null;
  chapters: BookChapter[];
  myProgress?: BookProgress;
}

/**
 * Reading progress
 */
export interface BookProgress {
  lastChapterId: string | null;
  chapterProgress: Record<string, ChapterProgress>;
}

/**
 * Chapter progress
 */
export interface ChapterProgress {
  isRead: boolean;
  readAt: string | null;
}

/**
 * POST /api/v1/books
 */
export interface CreateBookRequest {
  title: string;
  description?: string | null;
  coverImageUrl?: string | null;
  slug?: string;
  categoryId?: string | null;
  tags?: string[];
}

/**
 * PATCH /api/v1/books/:id
 */
export interface UpdateBookRequest {
  title?: string;
  description?: string | null;
  coverImageUrl?: string | null;
  slug?: string;
  categoryId?: string | null;
  tags?: string[];
}

/**
 * POST /api/v1/books/:id/chapters
 */
export interface AddChapterRequest {
  documentId: string;
  position?: number;
  introText?: string | null;
  outroText?: string | null;
}

/**
 * PATCH /api/v1/books/:id/chapters/:chapterId
 */
export interface UpdateChapterRequest {
  introText?: string | null;
  outroText?: string | null;
  position?: number;
}

/**
 * PATCH /api/v1/books/:id/chapters/reorder
 */
export interface ReorderChaptersRequest {
  chapters: { id: string; position: number }[];
}

/**
 * PATCH /api/v1/books/:id/toc
 */
export interface UpdateTocRequest {
  toc: TocItem[];
}

/**
 * Book feed query
 */
export interface BookFeedQuery {
  cursor?: string;
  limit?: number;
  category?: string;
  tag?: string;
  q?: string;
  sort?: "recent" | "popular";
}

// =============================================================================
// TUTORIAL EXERCISE TYPES
// =============================================================================

/**
 * Code exercise data (for authors)
 */
export interface CodeExerciseData {
  type: "code";
  prompt: string;
  language: SupportedLanguage;
  initialCode: string;
  expectedOutput: string;
}

/**
 * Quiz exercise data (for authors)
 */
export interface QuizExerciseData {
  type: "quiz";
  question: string;
  options: string[];
  correctIndex: number;
}

/**
 * Code exercise data for readers (excludes expectedOutput)
 */
export interface CodeExerciseDataSummary {
  type: "code";
  prompt: string;
  language: SupportedLanguage;
  initialCode: string;
}

/**
 * Quiz exercise data for readers (excludes correctIndex)
 */
export interface QuizExerciseDataSummary {
  type: "quiz";
  question: string;
  options: string[];
}

/**
 * Combined exercise data for readers
 * Note: correct_index and expected_output are NEVER returned to readers
 */
export type ExerciseDataSummaryCombined =
  | CodeExerciseDataSummary
  | QuizExerciseDataSummary;

/**
 * Exercise entity
 */
export interface Exercise {
  id: string;
  documentId: string;
  type: ExerciseType;
  data: CodeExerciseData | QuizExerciseData;
  createdAt: string;
  updatedAt: string;
}

/**
 * Exercise for readers (safe data)
 */
export interface ExerciseSummary {
  id: string;
  type: ExerciseType;
  data: ExerciseDataSummaryCombined;
}

/**
 * POST /api/v1/documents/:id/exercises
 */
export interface CreateExerciseRequest {
  type: "code";
  data: CodeExerciseData;
}

/**
 * PATCH /api/v1/exercises/:id
 */
export interface UpdateExerciseRequest {
  type: "code";
  data: Partial<CodeExerciseData>;
}

/**
 * Code submission
 */
export interface CodeSubmission {
  type: "code";
  code: string;
}

/**
 * Quiz submission
 */
export interface QuizSubmission {
  type: "quiz";
  answerIndex: number;
}

/**
 * Submit answer request
 */
export type SubmitAnswerRequest = CodeSubmission | QuizSubmission;

/**
 * Submission attempt result
 */
export interface AttemptResult {
  isCorrect: boolean;
  submittedAt: string;
  codeSubmitted: string | null;
}

/**
 * Submission result
 */
export interface SubmissionResult {
  isCorrect: boolean;
  attempts: AttemptResult[];
}

// =============================================================================
// LIKES & BOOKMARKS TYPES
// =============================================================================

/**
 * Toggle like response
 */
export interface ToggleLikeResult {
  liked: boolean;
  likesCount: number;
}

/**
 * Likes response
 */
export interface LikesResponse {
  likesCount: number;
  likedByMe: boolean | null; // null = unauthenticated
}

/**
 * Bookmark result
 */
export interface BookmarkResult {
  bookmarked: boolean;
}

/**
 * Bookmark item
 */
export interface BookmarkItem {
  id: string;
  document: DocumentCard;
  createdAt: string;
}

// =============================================================================
// WORKSPACE & NOTES TYPES
// =============================================================================

/**
 * Color labels for notes
 */
export interface ColorLabels {
  [color: string]: string;
}

/**
 * Workspace entity
 */
export interface Workspace {
  id: string;
  ownerId: string;
  type: "personal" | "team";
  name: string;
  isPersonal: boolean;
  colorLabels: ColorLabels | null;
  createdAt: string;
  updatedAt: string;
  stats?: WorkspaceStats;
}

/**
 * Workspace statistics
 */
export interface WorkspaceStats {
  notesCount: number;
  journalsCount: number;
}

/**
 * Note entity
 */
export interface Note {
  id: string;
  workspaceId: string;
  title: string | null;
  content: string;
  type: NoteType;
  language: string | null;
  color: NoteColor;
  createdAt: string;
  updatedAt: string;
}

/**
 * POST /api/v1/notes
 */
export interface CreateNoteRequest {
  title?: string | null;
  content: string;
  type?: NoteType;
  language?: string | null;
  color?: NoteColor;
}

/**
 * PATCH /api/v1/notes/:id
 */
export interface UpdateNoteRequest {
  title?: string | null;
  content?: string;
  type?: NoteType;
  language?: string | null;
  color?: NoteColor;
}

/**
 * Note query parameters
 */
export interface NoteQuery {
  cursor?: string;
  limit?: number;
  type?: NoteType;
  color?: NoteColor;
}

/**
 * PATCH /api/v1/workspace/me/color-labels
 */
export interface UpdateColorLabelsRequest {
  colorLabels: ColorLabels | null;
}

// =============================================================================
// HIGHLIGHTS & JOURNAL TYPES
// =============================================================================

/**
 * Highlight position in document
 */
export interface HighlightPosition {
  nodeIndex: number;
  offsetStart: number;
  offsetEnd: number;
}

/**
 * Highlight selection
 */
export interface HighlightSelection {
  text: string;
  color: string;
  position: HighlightPosition;
}

/**
 * Highlight entity
 */
export interface Highlight {
  id: string;
  userId: string;
  documentId: string;
  selection: HighlightSelection;
  annotation: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Highlight for document view
 */
export interface DocumentHighlight {
  id: string;
  selection: HighlightSelection;
  annotation: Record<string, unknown> | null;
  createdAt: string;
}

/**
 * Highlight palette
 */
export interface HighlightPalette {
  colors: string[];
}

/**
 * POST /api/v1/documents/:id/highlights
 */
export interface CreateHighlightRequest {
  documentId: string;
  selection: HighlightSelection;
  annotation?: Record<string, unknown> | null;
}

/**
 * PATCH /api/v1/highlights/:id
 */
export interface UpdateHighlightRequest {
  selection?: HighlightSelection;
  annotation?: Record<string, unknown> | null;
}

/**
 * PATCH /api/v1/highlights/palette
 */
export interface UpdatePaletteRequest {
  colors: string[];
}

/**
 * Highlight grouped by document (DOCUMENT_REF_SCHEMA)
 */
export interface HighlightGrouped {
  document: {
    id: string;
    title: string;
    slug: string;
    authorUsername: string;
  };
  highlights: Highlight[];
}

/**
 * Journal entity
 */
export interface Journal {
  id: string;
  workspaceId: string;
  title: string;
  description: string | null;
  color: NoteColor;
  createdAt: string;
  updatedAt: string;
}

/**
 * Journal with highlights
 */
export interface JournalWithHighlights extends Journal {
  highlights: JournalHighlight[];
}

/**
 * Highlight in a journal
 */
export interface JournalHighlight {
  id: string;
  highlightId: string;
  position: number;
  highlight: Highlight;
}

/**
 * POST /api/v1/journals
 */
export interface CreateJournalRequest {
  title: string;
  description?: string | null;
  color?: NoteColor;
}

/**
 * PATCH /api/v1/journals/:id
 */
export interface UpdateJournalRequest {
  title?: string;
  description?: string | null;
  color?: NoteColor;
}

/**
 * POST /api/v1/journals/:id/highlights
 */
export interface AddHighlightToJournalRequest {
  highlightId: string;
  position?: number;
}

/**
 * PATCH /api/v1/journals/:id/highlights/reorder
 */
export interface ReorderHighlightsRequest {
  highlights: { id: string; position: number }[];
}

// =============================================================================
// FOLLOWS TYPES
// =============================================================================

/**
 * Follow request item
 */
export interface FollowRequest {
  id: string;
  follower: ProfilePublic;
  following: ProfilePublic;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

/**
 * Profile with follow info
 */
export interface ProfileWithFollow extends Profile {
  isFollowing: boolean | null; // null = unauthenticated
  followStatus: FollowStatus;
  followersCount: number;
  followingCount: number;
}

/**
 * Follower/following list item
 */
export interface FollowListItem extends ProfilePublic {
  isFollowing: boolean | null; // null = unauthenticated
  followStatus: FollowStatus;
}

// =============================================================================
// PLATFORM APPS & ONBOARDING
// =============================================================================

/**
 * App access mode
 * - 'open': any user can activate
 * - 'beta': requires accepted invite
 */
export type AccessMode = "open" | "beta";

/**
 * GET /api/v1/platform-apps
 *
 * Platform app available in the catalog
 */
export interface PlatformApp {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  accessMode: AccessMode;
  iconUrl: string | null;
  tagline: string | null;
  category: string | null;
  isActive: boolean;
  createdAt: string;
}

/**
 * POST /api/v1/platform-apps/me
 *
 * Activate apps for the current user (by slug)
 */
export interface ActivateAppsRequest {
  apps: string[];
}

/**
 * Onboarding flow step
 * - 'username': OAuth account needs to pick a username
 * - 'apps': account needs to pick apps
 * - 'complete': onboarding is finished
 */
export type OnboardingStep = "username" | "apps" | "complete";

/**
 * GET /api/v1/auth/onboarding/status
 */
export interface OnboardingStatusData {
  step: OnboardingStep;
  user: User & { hasPassword: boolean };
  profile: Pick<
    Profile,
    "id" | "userId" | "username" | "displayName" | "avatarUrl" | "isPrivate"
  >;
  apps: string[];
}

// =============================================================================
// HEALTH CHECK
// =============================================================================

/**
 * Health check response
 */
export interface HealthResponse {
  status: "ok";
  uptime: number;
  timestamp: string;
}

// =============================================================================
// ADMIN & PLATFORM APP MANAGEMENT
// =============================================================================

/**
 * GET /api/v1/admin/overview
 *
 * Aggregate counts for the admin dashboard.
 */
export interface AdminOverview {
  users: { total: number; admins: number };
  chat: { servers: number; pendingMembers: number };
  apps: { active: number };
}

/**
 * Minimal profile nested inside an admin user list item.
 */
export interface AdminUserProfile {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
}

/**
 * GET /api/v1/admin/users
 *
 * A single user row in the admin users list.
 */
export interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: "user" | "admin";
  emailVerified: boolean;
  onboardingComplete: boolean;
  createdAt: string;
  deletedAt: string | null;
  profile: AdminUserProfile | null;
}

/**
 * The `user` payload nested inside GET /api/v1/admin/users/:id.
 */
export interface AdminUserDetailUser {
  id: string;
  email: string;
  username: string;
  role: "user" | "admin";
  emailVerified: boolean;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

/**
 * The `profile` payload nested inside GET /api/v1/admin/users/:id.
 */
export interface AdminUserDetailProfile {
  id: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  isPrivate: boolean;
}

/**
 * App link as returned inside GET /api/v1/admin/users/:id.
 */
export interface AdminUserAppLink {
  slug: string;
  name: string;
}

/**
 * Chat server membership as returned inside GET /api/v1/admin/users/:id.
 */
export interface AdminUserServerLink {
  name: string;
  role: string;
  status: string;
}

/**
 * Workspace as returned inside GET /api/v1/admin/users/:id.
 */
export interface AdminUserWorkspace {
  id: string;
  name: string;
  type: "personal" | "team";
}

/**
 * Authorship signature as returned inside GET /api/v1/admin/users/:id.
 */
export interface AdminUserSignature {
  userHash: string;
  createdAt: string;
}

/**
 * GET /api/v1/admin/users/:id
 *
 * Full admin detail for a single user (nested shape, not flat).
 */
export interface AdminUserDetail {
  user: AdminUserDetailUser;
  profile: AdminUserDetailProfile | null;
  apps: AdminUserAppLink[];
  servers: AdminUserServerLink[];
  workspace: AdminUserWorkspace | null;
  signature: AdminUserSignature | null;
}

/**
 * Page-based pagination result, distinct from the cursor-based
 * PaginatedResult<T>. Do NOT merge these two shapes.
 */
export interface AdminPaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Query params for GET /api/v1/admin/users.
 * Note: `deleted` is a string ('true'|'false'), matching the raw querystring.
 */
export interface AdminUsersQueryParams {
  search?: string;
  role?: "user" | "admin";
  page?: number;
  limit?: number;
  deleted?: "true" | "false";
}

/**
 * PATCH /api/v1/admin/users/:id/role
 */
export interface UpdateUserRolePayload {
  role: "user" | "admin";
}

/**
 * Response data of PATCH /api/v1/admin/users/:id/role.
 * Either the updated user or `{ message: 'Role unchanged' }` when the
 * requested role equals the current one.
 */
export type UpdateUserRoleResult =
  | Pick<
      AdminUserDetailUser,
      "id" | "email" | "username" | "role" | "updatedAt"
    >
  | { message: string };

/**
 * POST /api/v1/platform-apps (admin only)
 *
 * Creates a platform app. `slug` and `name` are required. Returns the full
 * PlatformApp row.
 */
export interface CreatePlatformAppPayload {
  slug: string;
  name: string;
  description?: string | null;
  accessMode?: AccessMode;
  iconUrl?: string | null;
  tagline?: string | null;
  category?: string | null;
}

/**
 * PATCH /api/v1/platform-apps/:id (admin only)
 *
 * All fields optional. Returns the full PlatformApp row.
 */
export interface UpdatePlatformAppPayload {
  name?: string;
  description?: string | null;
  accessMode?: AccessMode;
  iconUrl?: string | null;
  tagline?: string | null;
  category?: string | null;
  isActive?: boolean;
}

/**
 * App invite row for a beta app.
 */
export interface AppInvite {
  id: string;
  appId: string;
  profileId: string;
  invitedBy: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  decidedAt: string | null;
}

/**
 * App invite joined with the invited profile's display info.
 */
export interface AppInviteWithProfile extends AppInvite {
  username: string;
  displayName: string | null;
}

/**
 * POST /api/v1/platform-apps/:appId/invites (admin only)
 */
export interface CreateAppInvitePayload {
  profileId: string;
}

/**
 * GET /api/v1/chat/servers/all (admin only)
 *
 * A single chat server row in the admin chat oversight list.
 * Includes an accepted member count via LEFT JOIN.
 */
export interface AdminChatServer {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  iconUrl: string | null;
  createdAt: string;
  memberCount: number;
}

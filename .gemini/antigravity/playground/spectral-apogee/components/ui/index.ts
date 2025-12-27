/**
 * UI Component Exports
 * 
 * Centralized export of all atomic UI components.
 */

// Form components
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button';
export { Input, type InputProps } from './Input';
export { Textarea, type TextareaProps } from './Textarea';
export { Select, type SelectProps, type SelectOption } from './Select';

// Layout components
export {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    type CardProps,
    type CardHeaderProps,
    type CardContentProps,
    type CardFooterProps,
} from './Card';

// Display components
export {
    Badge,
    type BadgeProps,
    type BadgeVariant,
    type BadgeSize,
    getEquipmentStatusBadgeVariant,
    getRequestStatusBadgeVariant,
    getPriorityBadgeVariant,
} from './Badge';

// Feedback components
export { Modal, ModalFooter, type ModalProps, type ModalSize, type ModalFooterProps } from './Modal';
export { Spinner, FullPageSpinner, InlineSpinner, type SpinnerProps, type SpinnerSize } from './Spinner';
export {
    Skeleton,
    SkeletonText,
    SkeletonCard,
    SkeletonTable,
    SkeletonAvatar,
    type SkeletonProps,
    type SkeletonTextProps,
    type SkeletonCardProps,
    type SkeletonTableProps,
    type SkeletonAvatarProps,
} from './Skeleton';
export {
    ToastProvider,
    useToast,
    type Toast,
    type ToastVariant,
} from './Toast';
export { ToastItem, type ToastItemProps } from './ToastItem';
export {
    ConfirmDialog,
    DeleteDialog,
    type ConfirmDialogProps,
    type ConfirmDialogVariant,
} from './ConfirmDialog';
export {
    EmptyState,
    NoEquipment,
    NoTeams,
    NoRequests,
    NoSearchResults,
    type EmptyStateProps,
    type EmptyStateIcon,
} from './EmptyState';

// Navigation components
export {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    type TabsProps,
    type TabsListProps,
    type TabsTriggerProps,
    type TabsContentProps,
} from './Tabs';


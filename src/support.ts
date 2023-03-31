import {onMounted} from "vue";

export function useBodyScrollFreeze() {
    function freeze() {
        document.body.style.overflow = 'hidden';
    }

    function unfreeze() {
        document.body.style.overflow = 'auto';
    }

    onUnmounted(() => unfreeze());

    return { freeze, unfreeze };
}

export function useEscKey(callback: () => void) {
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            callback();
        }
    }

    onMounted(() => window.addEventListener('keydown', handleKeydown));
    onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
}

export function bytesToHumanReadableSize(bytes: number): string {
    if (bytes < 1024) {
        return bytes + ' Bytes';
    } else if (bytes >= 1024 && bytes < Math.pow(1024, 2)) {
        return (bytes / 1024).toFixed(2) + 'KB';
    } else if (bytes >= Math.pow(1024, 2) && bytes < Math.pow(1024, 3)) {
        return (bytes / Math.pow(1024, 2)).toFixed(2) + 'MB';
    } else {
        return (bytes / Math.pow(1024, 3)).toFixed(2) + 'GB';
    }
}
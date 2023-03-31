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
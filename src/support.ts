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
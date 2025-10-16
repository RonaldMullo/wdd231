export function openModal(dialogEl) {
    if (!dialogEl?.showModal) return;
    dialogEl.showModal();
}

export function closeModal(dialogEl) {
    if (!dialogEl) return;
    dialogEl.close();
}

export function bindDialog(dialogEl) {
    if (!dialogEl) return;
    
    dialogEl.addEventListener('click', (e) => {
        const rect = dialogEl.getBoundingClientRect();
        const clickedOutside = !(
            e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom
        );
        
        if (clickedOutside) dialogEl.close();
    });
}
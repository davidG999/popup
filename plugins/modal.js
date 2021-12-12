function _createModal(options) {
  const modal = document.createElement('div')
  modal.classList.add('dmodal')
  modal.insertAdjacentHTML('afterbegin', `
  <div class="dmodal">
    <div class="modal-overlay">
      <div class="modal-window">
        <div class="modal-header">
          <span class="modal-title">Modal title</span>
          <span class="modal-close">&times;</span>
        </div>
        <div class="modal-body">
          <p>Lorem ipsum dolor sit.</p>
          <p>Lorem ipsum dolor sit.</p>
        </div>
        <div class="modal-footer">
          <button>Ok</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  </div>
  `)
  document.body.appendChild(modal)
  return modal
}

$.modal = function (options) {
  const $modal = _createModal(options)

  return {
    open() {
      $modal.classList.add('open')
    },
    close() {
      $modal.classList.remove('open')
    },
    destroy() { },
  }
}
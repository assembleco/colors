"use strict";

class Modal {
  constructor(modalContents) {
    this.contents = modalContents;

    $(this.contents).find(".modal-close").on("click", this.close.bind(this));
    $(this.contents).on("click", this.close.bind(this));
  }

  open() {
    $(this.contents).show();
  }

  close() {
    $(this.contents).hide();
  }
}

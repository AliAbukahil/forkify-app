import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

// child class
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      //The closest method searches up in the DOM tree and it looks for parents not down in tree looking for childern
      const btn = e.target.closest('.btn--inline');
      // another guard clause
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupBtnNxt() {
    const curPage = this._data.page;
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  _generateMarkupBtnPrev() {
    const curPage = this._data.page;
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    // The Math.ceil() function always rounds a number up to the next largest integer.
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // Page 1, and there are other Pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtnNxt();
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtnPrev();
    }

    // and also the scenario that we are on some OTHER page
    if (curPage < numPages) {
      return `
          ${this._generateMarkupBtnPrev()}
          ${this._generateMarkupBtnNxt()}
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();

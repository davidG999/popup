let movies = [
  {
    id: 1, title: 'The Shawshank Redemption', price: '$5.12',
    link: 'https://www.imdb.com/title/tt0111161/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=9703a62d-b88a-4e30-ae12-90fcafafa3fc&pf_rd_r=6HCXZGTEXAAJMJ1T0DV4&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_1',
    img: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg?1639336004076'
  },
  {
    id: 2, title: 'The Godfather', price: '$24.99',
    link: 'https://www.imdb.com/title/tt0068646/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=9703a62d-b88a-4e30-ae12-90fcafafa3fc&pf_rd_r=6HCXZGTEXAAJMJ1T0DV4&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_2',
    img: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
  },
  {
    id: 3, title: 'The Godfather: Part II', price: '$16.99',
    link: 'https://www.imdb.com/title/tt0071562/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=9703a62d-b88a-4e30-ae12-90fcafafa3fc&pf_rd_r=6HCXZGTEXAAJMJ1T0DV4&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_3',
    img: 'https://m.media-amazon.com/images/I/51eL8bPdkrL._SY445_.jpg',
  }
]

const toHTML = movie => `
  <div class="col m-4">
    <div class="card">
      <img class="card-img-top" src="${movie.img}" alt="${movie.title}">
      <div class="card-body text-center">
        <h5 class="card-title">${movie.title}</h5>
        <div>
          <a href="#" class="btn btn-primary" data-btn="price" style="margin: 5px" data-id="${movie.id}">Price</a>
          <a href="#" class="btn btn-danger" data-btn="remove" data-id="${movie.id}">Remove</a>
        </div>
      </div>
    </div>
  </div>
`

function render() {
  const html = movies.map(toHTML).join('')
  //: same as
  // const html = movies.map(movie => toHTML(movie)).join('')

  document.querySelector('#movies').innerHTML = html
}

render()

const priceModal = $.modal({
  title: 'Price of an item',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Close', type: 'primary', handler() {
        priceModal.close()
      }
    }
  ]
})

document.addEventListener('click', event => {
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const movie = movies.find(f => f.id === id)

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>${movie.title}: <b>${movie.price}$</b></p>
      <a href="${movie.link}" target="_blank"> More movie info </a>
    `)
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `<p>You are about to remove: <b>${movie.title}</b></p>`
    }).then(() => {
      movies = movies.filter(f => f.id !== id)
      render()
    }).catch(() => {
      console.log('Cancel')
    })
  }
})
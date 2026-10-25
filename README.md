# PestPair (demo prototype)

PestPair is a demo website for a pest control marketplace concept. A customer uploads a photo of a pest, enters a ZIP code, and chooses between two tiers:

- **Trusted:** established pest control companies with more reviews and higher prices.
- **Fast:** solo licensed exterminators nearby, with lower prices and sorted by arrival time.

This is a prototype for demonstration only. It takes no real bookings, and every business, rating, review, and price is fictional.

## Pages

| File | What it shows |
| --- | --- |
| `index.html` | Home page, three-step explanation, and "How We Make Money" ($165 job split) |
| `book.html` | Booking flow: photo, mock identification, ZIP code, tiers, request, confirmation |
| `exterminators.html` | For Exterminators: how to join, what you keep, and moving from Fast to Trusted |

## Files

```
pestpair/
├── index.html
├── book.html
├── exterminators.html
├── assets/
│   ├── css/styles.css
│   └── js/booking.js
├── .nojekyll
├── README.md
└── PUBLISHING.md
```

## Notes

- It is a static site: HTML, CSS, and JavaScript only, with no backend and no external services.
- The photo "identification" is a fixed sample result after a short delay. No AI runs and no photo is uploaded.
- Forms send nothing. The site does not collect or store personal information.

## Preview on your computer

Open `index.html` in a web browser. To publish the site, see [PUBLISHING.md](PUBLISHING.md).

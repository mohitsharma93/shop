import React, { Fragment } from 'react'

const ListReview = ({ reviews }) => {
  return (
    <Fragment>
      <div className="reviews w-75">
				<h3>Other's Reviews:</h3>
				<hr />
        {reviews && reviews.map(r => (
          <div key={r._id} className="review-card my-3">
					<div className="rating-outer">
						<div className="rating-inner" style={{ width: `${(r.rating / 5) * 100}%`}}></div>
					</div>
					<p className="review_user">{r.name}</p>
					<p className="review_comment">{r.comment}</p>
					<hr />
				</div>
        ))}
			</div>
    </Fragment>
  )
}

export default ListReview

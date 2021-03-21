class ApiFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	search() {
		const keywords = this.queryStr.keywords
			? {
					name: {
						$regex: this.queryStr.keywords,
						$options: 'i',
					},
			  }
			: {};

      this.query = this.query.find({ ...keywords });
      return this;
	}

  filter() {
    const query = { ...this.queryStr };

    // remove some fields from query.
    const removeFields = ['keywords', 'limit', 'page'];
    removeFields.forEach(e => delete query[e]);

    //advance filter by price, rating etc...
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

    // console.log(query);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(perPage) {
    const currentPage = Number(this.queryStr.page) || 1 ;
    const skip = perPage * (currentPage - 1);

    this.query = this.query.limit(perPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
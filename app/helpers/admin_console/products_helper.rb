module AdminConsole
  module ProductsHelper
    def format_date(datetime)
      datetime.localtime.strftime('%b %d, %Y')
    end

    def product_price_range(sizes)
      sizes.pluck(:price).minmax.uniq.map do |price|
        number_to_currency(price, unit: 'PHP')
      end.join(' - ')
    end
  end
end

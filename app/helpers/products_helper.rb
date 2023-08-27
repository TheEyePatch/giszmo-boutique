module ProductsHelper
  def format_date(datetime)
    datetime.localtime.strftime('%b %d, %Y')
  end
end

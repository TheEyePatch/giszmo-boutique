# require "action_view"

module View
  class Breadcrumb
    attr_reader :items
    def initialize
      @items = []
    end

    def add(text, url)
      @items.push([text, url])
    end
  end
end

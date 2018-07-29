import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { number } from 'discourse/lib/formatter';

createWidget('cat-category', {
  tagName: 'div.cat-link',
  
  html(c) {
    
  //  var results=''; 
    
    if (c.parent_category_id) {
      this.tagName += '.subcategory';
    }
 
    this.tagName += '.category-' + Discourse.Category.slugFor(c, '-');

    const results = [
      this.attach("category-link", { category: c, allowUncategorized: true })
    ]; 
    
    
 //   if (c.notification_level !== 0) { results = [ this.attach('category-link', { category: c, allowUncategorized: true }) ]; }
    
    const unreadTotal = parseInt(c.get('unreadTopics'), 10) + parseInt(c.get('newTopics'), 10);
    if (unreadTotal) {
      results.push(h('a.badge.badge-notification', {
        attributes: { href: c.get('url') }
      }, number(unreadTotal)));
    }

    if (!this.currentUser) {
      results.push(h('b.topics-count', number(c.get('topic_count'))));
    }

    return results;
  }
});

export default createWidget('cat-categories', {
  tagName: 'div.category-links.clearfix',

   html(attrs) {
  // const href = Discourse.getURL("/categories");
//   const hrefmy = Discourse.getURL("/my/preferences/categories");  
     
   let  result = [];

    const categories = attrs.categories;
    if (categories.length === 0) {
      return;
    }
    result = result.concat(
      categories.map(c => this.attach("cat-category", c))
    );

    if (attrs.showMore) {
      
    if (!this.currentUser) {  
      var href = Discourse.getURL("/categories");
      result = result.concat(
        h(
          "div.footer",
          h(
            "a.d-link.more-link",
            { attributes: { href } },
            //I18n.t("categories.more")
            "Посмотреть все..."
          )
        )
      );
      
    } else { 
      
      var href = Discourse.getURL("/my/preferences/categories");
      
       result = result.concat(
        h(
          "div.kollonka",
          h(
            "a.d-link.more-link",
            { attributes: { href } },
             "редактировать разделы"
          )
        )
      );     
      
     } 
      
    }

    return result;
  }
});

# react-responsive-tab-pills

### Description
Navbar component that moves the navbar items to a dropdown, if they do not fit in the content area.

### Installation
```
npm install @normanandsons/react-responsive-tab-pills
```

### Demo
View the [DEMO](https://normanandsons.github.io/react-responsive-tab-pills)

### Builds
#### UMD
The default build with compiled styles in the .js file. Also minified version available in the lib/umd directory.
#### CommonJS/ES Module
You need to configure your module loader to use `cjs` or `es` fields of the package.json to use these module types.
Also you need to configure sass loader, since all the styles are in sass format.
* With webpack use [resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolve-mainfields) to configure the module type.
* Add [SASS loader](https://github.com/webpack-contrib/sass-loader) to support importing of SASS styles.

### API
| Prop name          | Type                         | Default             | Description                                 |
| ------------------ | ---------------------------- | ------------------- | ------------------------------------------- |
| id                 | string                       | 'responsive-navbar' | Custom ID prefix                            |
| className          | string                       |                     | Custon className                            |
| activeKey          | number || object             | required            | Navbar item to be active initially          |
| list               | array of object (name, href) | required            | List of navbar items                        |
| fontSize           | string                       | 'inherit'           | override for fontSize                       |
| fontWeight         | string                       | 'inherit'           | override for fontWeight                     |
| height             | string                       | 40px                | override for height                         |
| height             | string                       | 40px                | override for height                         |
| onSelect           | function                     |                     | Callback fired when the active item changes |
| allowReorder       | boolean                      |                     | Allow drag and drop reorder                 |
| onReorder          | function                     |                     | Callback fired when pills rearranged        |
| allowClose         | boolean                      |                     | Allow pills to be closable                  |
| onClose            | function                     |                     | Callback fired when pills closed            |

### Code example
```jsx
import ResponsiveTabPills from '@normanandsons/react-responsive-tab-pills';

const ResponsiveNavbarView = (props) => {
  const list = [
    { name: 'Item 1', id: 0, href: '/settings' },
    { name: 'Item 2', id: 1, href: '/help' },
  ];

  const activeKey = 1;

  return (
    <ResponsiveTabPills
      activeKey={activeKey}
      list={list}
      onSelect={(id, index) => { props.router.push(list[index].href); }}
    />
  );
};

export default withRouter(ResponsiveNavbarView);
```

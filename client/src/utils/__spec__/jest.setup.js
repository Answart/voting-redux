// this helps: https://github.com/facebook/jest/issues/2081#issuecomment-332406033
import 'raf/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure testing
configure({ adapter: new Adapter() });

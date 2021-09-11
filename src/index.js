import { View } from './view';
import { Model } from './model';
import { Controller } from './controller';

import style from './css/style.css';

const app = new Controller(new View(), new Model());

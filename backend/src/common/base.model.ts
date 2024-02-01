import addFormats from 'ajv-formats';
import { Model, AjvValidator } from 'objection';

class BaseModel extends Model {
  id: string;
  createdDate: Date;
  updatedDate: Date;

  $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  static createValidator(): AjvValidator {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        addFormats(ajv);
      },
      options: {
        allErrors: true,
        ownProperties: true,
        validateSchema: true,
      },
    });
  }

  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  };
}

export default BaseModel;

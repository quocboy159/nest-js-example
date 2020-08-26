import { EnumModel } from '../../common/models/enum.model';

export default class EnumHepler {
  public static getEnumList(data: Map<number, string>): EnumModel[] {
    const result: EnumModel[] = [];

    data.forEach((label: string, value: number) => {
      result.push({ value, label });
    });

    return result;
  }

  public static convertEnumToLabel(
    data: Map<number, string>,
    value: number,
  ): string {
    const result = data.get(value);

    return result;
  }
}

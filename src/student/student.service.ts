import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { Istudent } from 'src/interfaces/student.interface';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel("students") private sudentmodel : Model<Istudent>
    ){}

    async CreateStudent(createStudentDto :CreateStudentDto):Promise<Istudent> {

        const newstudent = await new this.sudentmodel(createStudentDto);
        return newstudent.save();

    }

    async findAllStudent():Promise<Istudent[]>{
       
        const students = await this.sudentmodel.find();
        if(!students){
            throw new NotFoundException('Students data not found!');
        }else{
            return students;
        }
    }

   async  deleteOneStudent(id : String):Promise<Istudent>{
    const studentdelete = await this.sudentmodel.findByIdAndDelete(id);
    if(!studentdelete){
        throw new NotFoundException("${id} n'existe pas");
    }else {
        return studentdelete;
    }
   }

   async updatestudent(id:string , updateStudentDto:UpdateStudentDto):Promise<Istudent>{

    const studentupdate = await this.sudentmodel.findByIdAndUpdate(id,updateStudentDto, { new: true });

    if(!studentupdate){
        throw new NotFoundException("student not found")
    }else{
        return studentupdate;
    }

   }

   async getonestudent(id:string):Promise<Istudent>{
    const findstudent = await this.sudentmodel.findById(id).exec();
    if(!findstudent){
        throw new NotFoundException("student not found");
    }else{
        return findstudent;
    }
   }
}

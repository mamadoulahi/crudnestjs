import {Body, Post, Res, Controller, Get, HttpStatus } from '@nestjs/common';
import { Delete, Param, Put } from '@nestjs/common/decorators';
import { response } from 'express';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { json } from 'stream/consumers';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  
    constructor(
        private readonly studentservice : StudentService
    ){}


    @Post()
    async createstudent(@Res() response, @Body() createStudentDto: CreateStudentDto){

     try{
        const newstudent = await this.studentservice.CreateStudent(createStudentDto);
        response.status(HttpStatus.CREATED).json({
            message : "Student has been created successfully",
            newstudent
        })
     }
     
     catch(err){
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message: 'Error: Student not created!',
            error: 'Bad Request'
            
        })
     }

    }

    @Get()
    async getallstudent(@Res() response){
        try{
           const  students = await this.studentservice.findAllStudent();
           response.status(HttpStatus.OK).json({
            message : "la liste des étudiants",
            students
           })
        }
        
        catch(err){

        response.status(HttpStatus.BAD_REQUEST).json({
            message : "any student found",
            statusCode : 400
        })

        }
    }


    @Delete("/:id")
    async deletestudent(@Res() response,@Param('id') id:string){

        try{
            const studentdelete = await this.studentservice.deleteOneStudent(id);
            response.status(HttpStatus.OK).json({
                message : "student delete "
            })
        }
        catch(err){

            response.status(err.status).json(err.response)

        }

    }

    @Put("/:id")
    async updatestudent(@Res() response,@Param('id') id:string,@Body() updateStudentDto:UpdateStudentDto){
        try{
            const updateStudent = await this.studentservice.updatestudent(id,updateStudentDto);
            response.status(HttpStatus.OK).json({
                message : "student update",
                updateStudent
            })
        }
        catch(err){
            response.status(err.status).json(err.response)
        }

    }

    @Get('/:id')
    async getonestudent(@Res() response , @Param('id') id:string){

        try{
            const studentgot = await this.studentservice.getonestudent(id);
            response.status(HttpStatus.OK).json({
                message : "student gotten",
                studentgot
            })

        }
        catch(err){

            response.status(err.status).json(err.response)

        }

    }
}


